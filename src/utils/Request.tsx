// src/axiosService.js
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { config } from '../config';

const MySwal = withReactContent(Swal);
const errorToster = (message: string) => {
    MySwal.fire({
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: false,
        customClass: {
            popup: `color-danger`,
        },
    });
};

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL, // Change this to your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle GET requests
export const getRequest = async (url: string, params = {}, headers = {}) => {
    try {
        const response = await axiosInstance.get(url, { params, headers });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to handle POST requests
export const postRequest = async (url: string, data = {}, params = {}, headers = {}) => {
    try {
        const response = await axiosInstance.post(url, data, { params, headers });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to handle PUT requests
export const putRequest = async (url: string, data: object, params = {}, headers = {}) => {
    try {
        const response = await axiosInstance.put(url, data, { params, headers });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to handle DELETE requests
export const deleteRequest = async (url: string, params = {}, headers = {}) => {
    try {
        const response = await axiosInstance.delete(url, { params, headers });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Function to handle login
export const login = async (username: any, password: any, otp: any, loginKey: any) => {
    try {
        const headers = { loginKey: loginKey };
        const response = await axiosInstance.post('/v1/login', { username, password, otp }, { headers });
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const email = response.data.email;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('email', email);
        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
};

// Function to check if user is logged in
export const isLoggedIn = () => {
    return !!localStorage.getItem('accessToken');
};

// Error handling function
const handleError = (error: any) => {
    if (error.response) {
        errorToster(error.response.data.message);
    } else if (error.request) {
        console.error('Error Request:', error.request);
    } else {
        console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
};
