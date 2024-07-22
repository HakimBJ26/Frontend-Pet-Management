import axios from 'axios';
import { REFRESH_TOKEN_API } from './constants/PathBack';
import { SIGN_IN_PATH } from './constants/Paths';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 60000,
});


export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

axiosPrivate.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
     
        if ( error && error.response.status === 401) {
                localStorage.removeItem('role');
                localStorage.removeItem('id');
                  window.location.href = SIGN_IN_PATH;
        }
        console.log(error)
      
        if ( error && error.response.status === 500) {
            try {
                await axiosPrivate.post(REFRESH_TOKEN_API, {}, { withCredentials: true });
                const originalRequest = error.response.config;
                return axiosPrivate(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);






