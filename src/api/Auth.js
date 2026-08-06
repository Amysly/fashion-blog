import axios from "axios";

const AUTH_API = '/api/auth/';

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
        const res = await axios.post(`${AUTH_API}refresh`);
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || 'Failed to refresh token';
        throw new Error(message);
    }
};