import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../config';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const token = searchParams.get('token');
        
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link');
            return;
        }

        // Call backend API to verify email
        axios.get(`${config.API_BASE_URL}v1/verifyEmail/${token}`)
            .then((response) => {
                setStatus('success');
                setMessage(response.data.message || 'Email verified successfully!');
                setTimeout(() => navigate('/auth/login'), 3000);
            })
            .catch((error) => {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Verification failed. Link may be expired or invalid.');
            });
    }, [searchParams, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
                <div className="text-center">
                    {status === 'loading' && (
                        <>
                            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                            <h2 className="text-2xl font-bold text-gray-800">Verifying Email</h2>
                            <p className="mt-2 text-gray-600">{message}</p>
                        </>
                    )}
                    
                    {status === 'success' && (
                        <>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Email Verified!</h2>
                            <p className="mt-2 text-gray-600">{message}</p>
                            <p className="mt-4 text-sm text-gray-500">Redirecting to login...</p>
                        </>
                    )}
                    
                    {status === 'error' && (
                        <>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <svg className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Verification Failed</h2>
                            <p className="mt-2 text-gray-600">{message}</p>
                            <button 
                                onClick={() => navigate('/auth/login')}
                                className="mt-6 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
                            >
                                Go to Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
