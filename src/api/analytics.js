import axios from "axios";
import { getStoredAccessToken } from "../lib/authToken";
import { API_BASE_URL } from "./config";

const ANALYTICS_API = `${API_BASE_URL}api/analytics`;

axios.defaults.withCredentials = true;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getStoredAccessToken()}`,
  },
});

export const recordPageView = async (postId, visitorId) => {
  const response = await axios.post(`${ANALYTICS_API}/page-view`, {
    postId,
    visitorId,
  });

  return response.data;
};

export const getMonthlyReaders = async () => {
  const response = await axios.get(
    `${ANALYTICS_API}/monthly-readers`,
    authHeader()
  );

  return response.data;
};