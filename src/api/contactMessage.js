import axios from "axios";

const  MESSAGE_API = `${import.meta.env.VITE_API_URL}/api/contact`
const api = axios.create({
  baseURL: MESSAGE_API,
  withCredentials: true,
});

export const messageContact = async (messageData) => {
  try {
    const response = await api.post('/', messageData);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to send message');
  }
};