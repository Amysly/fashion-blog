import axios from "axios";
import { getStoredAccessToken } from "../lib/authToken";

const BLOG_API = `${import.meta.env.VITE_API_URL}/api/blog/`;
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

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${BLOG_API}admin/get-posts`);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch posts');
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await axios.get(`${BLOG_API}${slug}`);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch post');
  }
};

export const createBlog = async (postData) => {
  try {
    const response = await axios.post(
      `${BLOG_API}admin/create-post`,
      postData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to create post');
  }
};

export const updateBlog = async (id, postData) => {
  try {
    const response = await axios.put(
      `${BLOG_API}${id}`,
      postData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to update post');
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(
      `${BLOG_API}${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to delete post');
  }
};
