import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getRequest, postRequest } from '../../utils/Request';

const RegisterFace = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', employee_code: '', userId: '' });
    const [userLoading, setUserLoading] = useState(true);
    const token = localStorage.getItem('accessToken');
    const headers = { 'Authorization': `Bearer ${token}` };

    useEffect(() => {
        dispatch(setPageTitle('Register Face'));
        fetchCurrentUser();
        startCamera();
        return () => stopCamera();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await getRequest(`/v1/attendance/current-user`, {}, headers);
            const data = await response.json();
            if (data.success && data.user) {
                if (data.user.hasBiometric) {
                    navigate('/attendance/clock-in-out', { replace: true });
                    return;
                }
                setFormData({
                    name: data.user.name,
                    employee_code: data.user.employeeCode,
                    userId: data.user.userId
                });
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch user data', 'error');
        } finally {
            setUserLoading(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const imageData = captureImage();
        if (!imageData) {
            Swal.fire('Error', 'Unable to capture image', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await postRequest(`/v1/attendance/register-face`, { image: imageData }, {}, headers);
            const data = await response.json();

            if (response.ok && data.success) {
                await Swal.fire('Success', 'Face registered successfully!', 'success');
                navigate('/attendance/clock-in-out');
            } else {
                Swal.fire('Error', data.error || 'Failed to register face', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to connect to registration system', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Register Face</h2>
                <p className="text-gray-500 dark:text-gray-400">Register your face for attendance system</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="panel">
                        <h5 className="font-semibold text-lg mb-4">Camera Preview</h5>
                        <div className="relative mb-5">
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
                </div>

                <div className="space-y-6">
                    <div className="panel">
                        <h5 className="font-semibold text-lg mb-4">Details</h5>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-input bg-gray-100 dark:bg-gray-800"
                                    value={formData.name}
                                    disabled
                                    readOnly
                                />
                            </div>

                            <div>
                                <label htmlFor="employee_code" className="form-label">Employee Code</label>
                                <input
                                    id="employee_code"
                                    type="text"
                                    className="form-input bg-gray-100 dark:bg-gray-800"
                                    value={formData.employee_code}
                                    disabled
                                    readOnly
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={loading || !stream}
                            >
                                {loading ? (
                                    <span className="inline-flex items-center">
                                        <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 mr-2"></span>
                                        Registering...
                                    </span>
                                ) : (
                                    'Register Face'
                                )}
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary w-full"
                                onClick={() => navigate('/attendance/clock-in-out')}
                            >
                                Back to Attendance
                            </button>
                        </form>
                    </div>

                    <div className="panel">
                        <h5 className="font-semibold text-lg mb-3">Instructions</h5>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start">
                                <span className="text-success mr-2">✓</span>
                                <span>Look directly at the camera</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-success mr-2">✓</span>
                                <span>Ensure good lighting</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-success mr-2">✓</span>
                                <span>Remove glasses if possible</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-success mr-2">✓</span>
                                <span>Keep neutral expression</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-success mr-2">✓</span>
                                <span>Only one face visible</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterFace;
