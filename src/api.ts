import axios from 'axios';
import routes from './routes';

const api = axios.create({
  baseURL: routes.baseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authId');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers['x-auth'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
