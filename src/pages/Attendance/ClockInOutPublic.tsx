import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { postRequest } from '../../utils/Request';

const ClockInOutPublic = () => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [action, setAction] = useState<'clock_in' | 'clock_out'>('clock_in');
    const [lastAttendance, setLastAttendance] = useState<any>(null);

    useEffect(() => {
        startCamera();
        getLocation();
        return () => stopCamera();
    }, []);

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

    const handleClockAction = async () => {
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
        try {
            const requestData = {
                image: imageData,
                action: action,
                latitude: location.latitude,
                longitude: location.longitude
            };
            const data = await postRequest('/v1/attendance-public/clock', requestData, {}, {});

            if (data.success) {
                setLastAttendance(data.attendance);
                Swal.fire('Success', data.message, 'success');
                setAction(action === 'clock_in' ? 'clock_out' : 'clock_in');
            } else {
                Swal.fire('Error', data.error || 'Failed to process attendance', 'error');
            }
        } catch (error: any) {
            if (error.response?.status === 404 && error.response?.data?.error === 'Unknown face') {
                const result = await Swal.fire({
                    title: 'Face Not Registered',
                    text: 'Your face is not registered. Would you like to register now?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Register Now',
                    cancelButtonText: 'Cancel'
                });
                if (result.isConfirmed) {
                    window.location.href = '/test-register-face.html';
                }
            } else {
                Swal.fire('Error', 'Failed to connect to attendance system', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Attendance System (Test Mode)</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Camera Preview</h2>
                        <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border-2 border-gray-300" />
                        <canvas ref={canvasRef} className="hidden" />

                        <div className="flex gap-4 mt-4">
                            <button
                                className={`flex-1 py-3 rounded-lg font-semibold ${action === 'clock_in' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setAction('clock_in')}
                            >
                                Clock In
                            </button>
                            <button
                                className={`flex-1 py-3 rounded-lg font-semibold ${action === 'clock_out' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setAction('clock_out')}
                            >
                                Clock Out
                            </button>
                        </div>

                        <button
                            className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-50"
                            onClick={handleClockAction}
                            disabled={loading || !location}
                        >
                            {loading ? 'Processing...' : `Submit ${action === 'clock_in' ? 'Clock In' : 'Clock Out'}`}
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Status</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded">
                                <span>Location:</span>
                                <span className={location ? 'text-green-500' : 'text-red-500'}>
                                    {location ? 'Available' : 'Not Available'}
                                </span>
                            </div>
                            <div className="flex justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded">
                                <span>Camera:</span>
                                <span className={stream ? 'text-green-500' : 'text-red-500'}>
                                    {stream ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            {lastAttendance && (
                                <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
                                    <h3 className="font-bold mb-2">Last Attendance</h3>
                                    <p><strong>Action:</strong> {lastAttendance.action}</p>
                                    <p><strong>Time:</strong> {new Date(lastAttendance.timestamp).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClockInOutPublic;
