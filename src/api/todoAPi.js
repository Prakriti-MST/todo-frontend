// src/api/todosApi.js
import axios from 'axios';
import {store} from '../redux/store'; // important: import the store to access state

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/todos`,
});

// Add a request interceptor to include token from Redux
API.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; // access token from redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions
export const fetchTodosApi = () => API.get('/').then((res) => res.data);
export const addTodoApi = (todo) => API.post('/', todo).then((res) => res.data);
export const updateTodoApi = (id, upd) => API.put(`/${id}`, upd).then((res) => res.data);
export const deleteTodoApi = (id) => API.delete(`/${id}`).then(() => id);
