import axios from "axios";
import { getStoredAccessToken } from '../lib/authToken';

const AUTH_API = '/api/auth/';
axios.defaults.withCredentials = true;

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
        const res = await axios.post(`${AUTH_API}refresh`);
        return res.status === 204 ? null : res.data;
    } catch (err) {
        if (err.response?.status === 401) return null;

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
