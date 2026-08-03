import axios from 'axios';
import Cookies from 'js-cookie';
const url = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: `${url}/api/v1`,
    withCredentials: true
});

export default api;