import axios from 'axios';

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






