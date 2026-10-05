import axios from "axios";
import { getStoredAccessToken } from "../lib/authToken";
import { API_BASE_URL } from "./config";

const HEROSECTION_API = `${API_BASE_URL}/api/herosection/`;
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

  console.error('Blog API request failed', {
    status: error.response?.status,
    response: responseData,
  });

  return new Error(message);
};

export const getHeroSectionData = async () => {
  try {
    const response = await axios.get(`${HEROSECTION_API}admin/get-herosection`);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch hero section data');
  }
};



export const createHeroSection = async (postData) => {
  try {
    const response = await axios.post(
      `${HEROSECTION_API}admin/create-herosection`,
      postData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to create hero section');
  }
};

export const updateHeroSection = async (id, postData) => {
  try {
    const response = await axios.put(
      `${HEROSECTION_API}${id}`,
      postData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to update hero section');
  }
};

export const deleteHeroSection = async (id) => {
  try {
    const response = await axios.delete(
      `${HEROSECTION_API}${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to delete hero section');
  }
};
