import axios from 'axios';
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`
});

export const signupApi = (userData) =>
  API.post('/signup', userData).then(res => res.data);

export const loginApi = (creds) =>
  API.post('/login', creds).then(res => res.data);
