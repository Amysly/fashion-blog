import axios from "axios";
import { getStoredAccessToken } from "../lib/authToken";

const INSPIREDLOOKS_API = `${import.meta.env.VITE_API_URL}/api/inspiredlooks/`;
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

  console.error('inspiredLooks API request failed', {
    status: error.response?.status,
    response: responseData,
  });

  return new Error(message);
};

export const  getInspiredLooks = async () => {
  try {
    const response = await axios.get(`${INSPIREDLOOKS_API}admin/get-inspiredlooks`);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch image');
  }
};



export const createInspiredLook = async (postData) => {
  try {
    const response = await axios.post(
      `${INSPIREDLOOKS_API}admin/create-inspiredlooks`,
      postData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to create image');
  }
};

export const updateInspiredLook = async (id, postData) => {
  try {
    const response = await axios.put(
      `${INSPIREDLOOKS_API}${id}`,
      postData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to update image');
  }
};

export const deleteInspiredLook = async (id) => {
  try {
    const response = await axios.delete(
      `${INSPIREDLOOKS_API}${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to delete image');
  }
};
