import axios from 'axios';
import {BASE_URL} from './apiPaths.js';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle specific error codes
        if (error.response) {
            if (error.response.status === 401 ) {
                window.location.href = '/'; 
            }
            else if(error.response.status === 500){
                console.error('Server error')
            }
            else if(error.code === 'ECONNABORTED'){
                console.error('Request timeout')
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;