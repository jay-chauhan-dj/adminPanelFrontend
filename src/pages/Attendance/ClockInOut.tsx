import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getRequest, postRequest } from '../../utils/Request';

const ClockInOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [action, setAction] = useState<'clock_in' | 'clock_out'>('clock_in');
    const [lastAttendance, setLastAttendance] = useState<any>(null);
    const [hasBiometric, setHasBiometric] = useState<boolean | null>(null);
    const token = localStorage.getItem('accessToken');
    const headers = { 'Authorization': `Bearer ${token}` };
    const [onBreak, setOnBreak] = useState(false);
    const [breakLoading, setBreakLoading] = useState(false);
    const [elapsedTime, setElapsedTime] = useState('00:00:00');
    const [timerKey, setTimerKey] = useState(0);
    const [clockInTimestamp, setClockInTimestamp] = useState<number | null>(null);
    const token = localStorage.getItem('accessToken');
    const headers = { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

    useEffect(() => {
        dispatch(setPageTitle('Clock In/Out'));
        checkBiometric();
        fetchTodayAttendance();
        startCamera();
        getLocation();
        return () => stopCamera();
    }, []);

    useEffect(() => {
        if (!lastAttendance?.clock_in_time || lastAttendance?.clock_out_time) {
            setElapsedTime('00:00:00');
            setClockInTimestamp(null);
            return;
        }
        
        if (!clockInTimestamp) {
            setClockInTimestamp(Date.now());
        }
        
        const updateTimer = () => {
            if (!clockInTimestamp) return;
            const diff = Math.floor((Date.now() - clockInTimestamp) / 1000);
            const hours = Math.floor(diff / 3600);
            const minutes = Math.floor((diff % 3600) / 60);
            const seconds = diff % 60;
            setElapsedTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        };
        
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        
        return () => clearInterval(interval);
    }, [lastAttendance, clockInTimestamp]);

    const checkBiometric = async () => {
        try {
            const data = await getRequest("/v1/attendance/current-user", {}, headers);
            if (data.success) {
                setHasBiometric(data.user.hasBiometric);
            }
        } catch (error) {
            console.error('Failed to check biometric status');
        }
    };

    const fetchTodayAttendance = async () => {
        try {
            const data = await getRequest('/v1/attendance/today', {}, headers);
            if (data.success && data.attendance) {
                setLastAttendance(data.attendance);
                if (data.attendance.break_in_time && !data.attendance.break_out_time) {
                    setOnBreak(true);
                }
            }
        } catch (error) {
            console.error('Failed to fetch today attendance');
        }
    };

    const handleDeleteFace = async () => {
        const result = await Swal.fire({
            title: 'Delete Face Data?',
            text: 'This will remove your registered face. You will need to register again.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('accessToken');
                const data = await getRequest(`/v1/attendance/delete-face`, {}, headers);
                if (data.success) {
                    await Swal.fire('Deleted!', 'Your face data has been deleted.', 'success');
                    setHasBiometric(false);
                } else {
                    Swal.fire('Error', data.error || 'Failed to delete face', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to delete face data', 'error');
            }
        }
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            Swal.fire('Error', 'Unable to access camera', 'error');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    Swal.fire('Error', 'Unable to get location. Please enable location services.', 'error');
                }
            );
        }
    };

    const captureImage = (): string | null => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0);
                return canvas.toDataURL('image/jpeg');
            }
        }
        return null;
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return 'N/A';
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };

    const handleClockAction = async (selectedAction: 'clock_in' | 'clock_out') => {
        if (!location) {
            Swal.fire('Error', 'Location not available. Please enable location services.', 'error');
            return;
        }

        const imageData = captureImage();
        if (!imageData) {
            Swal.fire('Error', 'Unable to capture image', 'error');
            return;
        }

        setLoading(true);
        setAction(selectedAction);
        try {
            const requestData = {
                image: imageData,
                action: selectedAction,
                latitude: location.latitude,
                longitude: location.longitude
            }
            const data = await postRequest(`/v1/attendance/clock`, requestData, {}, headers);

            if (data.success) {
                setLastAttendance(data.attendance);
                Swal.fire('Success', data.message, 'success');
            } else {
                if (data.error === 'Unknown face') {
                    const result = await Swal.fire({
                        title: 'Face Not Registered',
                        text: 'Your face is not registered. Would you like to register now?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Register Now',
                        cancelButtonText: 'Cancel'
                    });
                    if (result.isConfirmed) {
                        navigate('/attendance/register-face');
                    }
                } else {
                    Swal.fire('Error', data.error || 'Failed to process attendance', 'error');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBreak = async () => {
        if (!location) {
            Swal.fire('Error', 'Location not available. Please enable location services.', 'error');
            return;
        }

        setBreakLoading(true);
        try {
            const requestData = {
                action: onBreak ? 'break_out' : 'break_in',
                latitude: location.latitude,
                longitude: location.longitude
            };
            const data = await postRequest('/v1/attendance/break', requestData, {}, headers);

            if (data.success) {
                setOnBreak(!onBreak);
                setLastAttendance(data.attendance);
                Swal.fire('Success', data.message, 'success');
            } else {
                Swal.fire('Error', data.error || 'Failed to process break', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to connect to attendance system', 'error');
        } finally {
            setBreakLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Attendance System</h2>
                <p className="text-gray-500 dark:text-gray-400">Mark your attendance with face recognition</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="panel">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg mb-4">Camera</h5>
                            <div className="relative">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full rounded-lg"
                                    style={{ maxHeight: '450px', objectFit: 'cover' }}
                                />
                                <canvas ref={canvasRef} className="hidden" />
                                {!stream && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 rounded-lg">
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={startCamera}
                                        >
                                            Enable Camera
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg"
                                    onClick={() => handleClockAction('clock_in')}
                                    disabled={loading || !location || !stream || !hasBiometric}
                                >
                                    {loading && action === 'clock_in' ? (
                                        <span className="inline-flex items-center">
                                            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 mr-2"></span>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Clock In'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-lg"
                                    onClick={() => handleClockAction('clock_out')}
                                    disabled={loading || !location || !stream || !hasBiometric}
                                >
                                    {loading && action === 'clock_out' ? (
                                        <span className="inline-flex items-center">
                                            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 mr-2"></span>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Clock Out'
                                    )}
                                </button>
                            </div>

                            <button
                                type="button"
                                className={`btn btn-lg w-full ${onBreak ? 'btn-info' : 'btn-warning'}`}
                                onClick={handleBreak}
                                disabled={breakLoading || !location || !hasBiometric}
                            >
                                {breakLoading ? (
                                    <span className="inline-flex items-center">
                                        <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 mr-2"></span>
                                        Processing...
                                    </span>
                                ) : onBreak ? (
                                    'Break End'
                                ) : (
                                    'Break Start'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="panel">
                        <h5 className="font-semibold text-lg mb-4">Status</h5>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
                                <span>Camera</span>
                                {stream ? (
                                    <span className="badge badge-outline-success">Active</span>
                                ) : (
                                    <button className="btn btn-sm btn-warning" onClick={startCamera}>Enable</button>
                                )}
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
                                <span>Location</span>
                                {location ? (
                                    <span className="badge badge-outline-success">Available</span>
                                ) : (
                                    <button className="btn btn-sm btn-warning" onClick={getLocation}>Enable</button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <h5 className="font-semibold text-lg mb-4">Face Registration</h5>
                        {hasBiometric === null ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : hasBiometric ? (
                            <div className="space-y-3">
                                <div className="p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded">
                                    ✓ Face Registered
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger w-full"
                                    onClick={handleDeleteFace}
                                >
                                    Delete & Re-register Face
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded">
                                    ⚠ Face Not Registered
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary w-full"
                                    onClick={() => navigate('/attendance/register-face')}
                                >
                                    Register Face Now
                                </button>
                            </div>
                        )}
                    </div>

                    {lastAttendance && (
                        <div className="panel">
                            <h5 className="font-semibold text-lg mb-4">Today's Attendance</h5>
                            <div className="space-y-3">
                                {lastAttendance.clock_in_time && !lastAttendance.clock_out_time && (
                                    <div className="p-5 bg-primary rounded-lg text-white text-center">
                                        <div className="text-xs uppercase tracking-widest mb-3 opacity-80 font-semibold">Working Time</div>
                                        <div className="text-5xl font-bold font-mono tabular-nums">{elapsedTime}</div>
                                    </div>
                                )}
                                {lastAttendance.clock_in_time && (
                                    <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-400 text-sm">Clock In</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400"><LiveTime baseTime={lastAttendance.clock_in_time} /></span>
                                        </div>
                                    </div>
                                )}
                                {lastAttendance.clock_out_time && (
                                    <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-400 text-sm">Clock Out</span>
                                            <span className="font-semibold text-red-600 dark:text-red-400"><LiveTime baseTime={lastAttendance.clock_out_time} /></span>
                                        </div>
                                    </div>
                                )}
                                {lastAttendance.break_in_time && (
                                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-400 text-sm">Break Start</span>
                                            <span className="font-semibold text-yellow-600 dark:text-yellow-400"><LiveTime baseTime={lastAttendance.break_in_time} /></span>
                                        </div>
                                    </div>
                                )}
                                {lastAttendance.break_out_time && (
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 dark:text-gray-400 text-sm">Break End</span>
                                            <span className="font-semibold text-blue-600 dark:text-blue-400"><LiveTime baseTime={lastAttendance.break_out_time} /></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClockInOut;
