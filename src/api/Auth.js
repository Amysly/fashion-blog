import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from '../lib/authToken';
import { API_BASE_URL } from "./config";

const AUTH_API = `${API_BASE_URL}/api/auth/`;
axios.defaults.withCredentials = true;

let refreshPromise;

const requestRefresh = () => {
    if (!refreshPromise) {
        refreshPromise = axios.post(`${AUTH_API}refresh`)
            .then(({ data }) => data?.accessToken ? data : null)
            .catch((error) => {
                if (error.response?.status === 401) return null;
                throw error;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config;
        const authorization = request?.headers?.Authorization || request?.headers?.authorization;
        const isRefreshRequest = request?.url?.includes(`${AUTH_API}refresh`);

        if (
            error.response?.status !== 401 ||
            !request ||
            request._retriedAfterRefresh ||
            isRefreshRequest ||
            !authorization?.startsWith('Bearer ')
        ) {
            return Promise.reject(error);
        }

        request._retriedAfterRefresh = true;

        try {
            const session = await requestRefresh();
            if (!session?.accessToken) {
                setStoredAccessToken(null);
                window.dispatchEvent(new Event('auth:session-expired'));
                return Promise.reject(error);
            }

            setStoredAccessToken(session.accessToken);
            request.headers = request.headers || {};
            request.headers.Authorization = `Bearer ${session.accessToken}`;
            return axios(request);
        } catch (refreshError) {
            setStoredAccessToken(null);
            window.dispatchEvent(new Event('auth:session-expired'));
            return Promise.reject(refreshError);
        }
    }
);

const authConfig = () => ({
    headers: { Authorization: `Bearer ${getStoredAccessToken()}` },
});

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${AUTH_API}register`, userData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to register';
        throw new Error(message);
    }
};

export const loginUser = async (userData) => {
    try {
        const res = await axios.post(`${AUTH_API}login`, userData);
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to login';
        throw new Error(message);
    }
};

export const logoutUser = async () => {
    try {
        await axios.post(`${AUTH_API}logout`);
    } catch (err) {
        const message = err.response?.data?.message || 'Failed to logout';
        throw new Error(message);
    }
};

export const refreshAccessToken = async () => {
    try {
        return await requestRefresh();
    } catch (err) {
        const message = err.response?.data?.message || 'Failed to refresh token';
        throw new Error(message);
    }
};

export const updateProfile = async (profile) => {
    try {
        const { data } = await axios.patch(`${AUTH_API}profile`, profile, authConfig());
        return data.user;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
};

/*export const updatePassword = async (passwords) => {
    try {
        const { data } = await axios.patch(`${AUTH_API}password`, passwords, authConfig());
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update password');
    }
};*/
