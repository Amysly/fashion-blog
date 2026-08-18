import axios from "axios";
import { getStoredAccessToken } from "../lib/authToken";

const SUBSCRIBE_API = '/api/subscribe';
axios.defaults.withCredentials = true;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getStoredAccessToken()}`,
  },
});

const getApiError = (error, fallbackMessage) => {
  const responseData = error.response?.data;
  const message = typeof responseData === 'string'
    ? responseData
    : responseData?.message || error.message || fallbackMessage;

  console.error('subscribers API request failed', {
    status: error.response?.status,
    response: responseData,
  });

  return new Error(message);
};

export const getEmailSubByAdmin = async () => {
  try {
    const response = await axios.get(
      `${SUBSCRIBE_API}/admin/get-subscribers`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch subscribers');
  }
};

export const createEmailSub = async (subscribeData) => {
  try {
    const response = await axios.post(
      `${SUBSCRIBE_API}/email-subscription`,
      subscribeData
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to subscribe');
  }
};