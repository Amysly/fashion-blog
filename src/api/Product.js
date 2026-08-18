import axios from "axios";
import { getStoredAccessToken } from "../lib/authToken";

const PRODUCT_API = '/api/products/';
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

  console.error('Product API request failed', {
    status: error.response?.status,
    response: responseData,
  });

  return new Error(message);
};

export const getProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_API);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch products');
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const response = await axios.get(`${PRODUCT_API}${slug}`);
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to fetch product');
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${PRODUCT_API}admin/create-product`,
      productData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to create product');
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(
      `${PRODUCT_API}${id}`,
      productData,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${PRODUCT_API}${id}`,
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw getApiError(error, 'Failed to delete product');
  }
};