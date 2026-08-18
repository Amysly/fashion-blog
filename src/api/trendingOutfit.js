import axios from "axios";
import { getStoredAccessToken } from "../lib/authToken";

const TRENDING_API = `${import.meta.env.VITE_API_URL}/api/trending-outfit/`
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

  console.error('Trending outfit API request failed', {
    status: error.response?.status,
    response: responseData,
  });

  return new Error(message);
};

export const getTrendingOutfit = async () => {
  try {
    const response = await axios.get(TRENDING_API);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch trending outfits');
  }
};


export const createTrendingOutfit = async (trendingData) => {
  try {
    const response = await axios.post(
      `${TRENDING_API}admin/create-trendingoutfit`,
      trendingData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to create trending outfit');
  }
};

export const getTrendingBySlug = async (slug) => {
  try {
    const baseUrl = TRENDING_API.replace(/\/$/, '');
    const response = await axios.get(`${baseUrl}/${slug}`);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch trending outfit');
  }
};

export const updateTrendingOutfit = async (id, trendingData) => {
  try {
    const response = await axios.put(
      `${TRENDING_API}${id}`,
      trendingData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to update trending outfit');
  }
};

export const deleteTrendingOutfit = async (id) => {
  try {
    const response = await axios.delete(
      `${TRENDING_API}${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to delete trending outfit');
  }
};