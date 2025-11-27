import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

    const API_BASE_URL = import.meta.env.REACT_APP_API_BASE || 'http://localhost:3000';

    useEffect(() => {
        dispatch(setPageTitle('Clock In/Out'));
        checkBiometric();
        startCamera();
        getLocation();
        return () => stopCamera();
    }, []);

    const checkBiometric = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${API_BASE_URL}/v1/attendance/current-user`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setHasBiometric(data.user.hasBiometric);
            }
        } catch (error) {
            console.error('Failed to check biometric status');
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
                const response = await fetch(`${API_BASE_URL}/v1/attendance/delete-face`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
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
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${API_BASE_URL}/v1/attendance/clock`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    image: imageData,
                    action: selectedAction,
                    latitude: location.latitude,
                    longitude: location.longitude
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setLastAttendance(data.attendance);
                Swal.fire('Success', data.message, 'success');
            } else {
                if (response.status === 404 && data.error === 'Unknown face') {
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
        } catch (error) {
            Swal.fire('Error', 'Failed to connect to attendance system', 'error');
        } finally {
            setLoading(false);
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

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="btn btn-success btn-lg"
                                onClick={() => handleClockAction('clock_in')}
                                disabled={loading || !location || !stream}
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
                                disabled={loading || !location || !stream}
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
                            <h5 className="font-semibold text-lg mb-4">Last Attendance</h5>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Action</span>
                                    <span className="font-semibold capitalize">{lastAttendance.action.replace('_', ' ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Time</span>
                                    <span className="font-semibold">{lastAttendance.clock_in_time || lastAttendance.clock_out_time || lastAttendance.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClockInOut;
