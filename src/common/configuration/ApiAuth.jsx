import axios from 'axios';
import { REFRESH_TOKEN_API } from './constants/PathBack';
import { SIGN_IN_PATH } from './constants/Paths';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 60000,
    // headers: {'X-Custom-Header': 'foobar'}
});


export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// Add a request interceptor to axiosPrivate
axiosPrivate.interceptors.request.use(
    (config) => {
        // Access token is managed by HttpOnly cookies, no need to manually set it here
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to axiosPrivate
axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
     
        if ( error && error.response.status === 401) {
                localStorage.removeItem('role');
                localStorage.removeItem('id');
                  // If refresh fails, redirect to login
                  window.location.href = SIGN_IN_PATH;
        }
        console.log(error)
      
        if ( error && error.response.status === 500) {
            try {
                // Attempt to refresh the token
                await axiosPrivate.post(REFRESH_TOKEN_API, {}, { withCredentials: true });
                // Retry the original request
                const originalRequest = error.response.config;
                return axiosPrivate(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        // Handle other errors
        return Promise.reject(error);
    }
);






