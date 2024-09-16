import axios from 'axios';
import routes from './routes';

const api = axios.create({
    baseURL: routes.baseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        // todo: поменять название айтема
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['x-auth'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post(routes.signIn(), { username, password });
        return response.data.token; // Возвращает токен
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Ошибка авторизации: ${error.response?.data?.message || error.message}`);
        } else {
            throw new Error(`Неизвестная ошибка авторизации: ${error}`);
        }
    }
};

export const getData = async (token: string) => {
    try {
        const response = await api.get(routes.tableData(), {
            headers: { 'x-auth': token },
        });
        return response.data; // Возвращает данные
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Ошибка получения данных: ${error.response?.data?.message || error.message}`);
        } else {
            throw new Error(`Неизвестная ошибка получения данных: ${error}`);
        }
    }
};

export const addRecord = async (record: any, token: string) => {
    try {
        const response = await api.post(routes.addRow(), record, {
            headers: { 'x-auth': token },
        });
        return response.data; // Возвращает данные после добавления
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Ошибка добавления записи: ${error.response?.data?.message || error.message}`);
        } else {
            throw new Error(`Неизвестная ошибка добавления записи: ${error}`);
        }
    }
};

export const deleteRecord = async (id: number, token: string) => {
    try {
        const response = await api.post(routes.deleteRow(id), {}, {
            headers: { 'x-auth': token },
        });
        if (response.data.error_code === 0) {
            return response.data; // Возвращает данные после удаления
        } else {
            throw new Error(`Ошибка удаления записи: ${response.data.message}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Ошибка удаления записи: ${error.response?.data?.message || error.message}`);
        } else {
            throw new Error(`Неизвестная ошибка удаления записи: ${error}`);
        }
    }
};

export const updateRecord = async (id: number, record: any, token: string) => {
    try {
        const response = await api.post(routes.editRow(id), record, {
            headers: { 'x-auth': token },
        });
        if (response.data.error_code === 0) {
            return response.data.data;
        } else {
            throw new Error(`Ошибка изменения записи: ${response.data.message}`);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Ошибка изменения записи: ${error.response?.data?.message || error.message}`);
        } else {
            throw new Error(`Неизвестная ошибка изменения записи: ${error}`);
        }
    }
};
