import axios from "axios";
import { API_BASE_URL } from "./config";

const MESSAGE_API = `${API_BASE_URL}/api/contact`
const api = axios.create({
  baseURL: MESSAGE_API,
  withCredentials: true,
});

const getApiError = (error, fallbackMessage) => {
  const responseData = error.response?.data;
  const message = typeof responseData === 'string'
    ? responseData
    : responseData?.message || error.message || fallbackMessage;

  console.error('Contact message API request failed', {
    status: error.response?.status,
    response: responseData,
  });

  return new Error(message);
};

export const messageContact = async (messageData) => {
  try {
    const response = await api.post('/', messageData);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to send message');
  }
};
