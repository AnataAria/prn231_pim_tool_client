import axios from "axios";

const baseUrl:string =  'https://pimtool-api.arisavinh.dev/api/v1'

const unAuthenticationAxios = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

const authenticationAxios = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

authenticationAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {
    unAuthenticationAxios,
    authenticationAxios
}