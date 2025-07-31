import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
});

export const getErrorMessage = (err) => {
  if (err.response) {
    return err.response.data?.message || 'An error occurred.';
  } else if (err.request) {
    return 'Unable to reach the server. Please try again later.';
  }
  return err.message;
};

api.interceptors.response.use(
  (res) => res,
  (err) => {
    err.message = getErrorMessage(err);
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export default api;
