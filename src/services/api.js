import axios from "axios";

// Base URL for Fake Store API
const BASE_URL = "https://fakestoreapi.com";

// Create a reusable axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * Get all products from the API
 * @returns {Promise<Array>} list of products
 */
export const getAllProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

/**
 * Get a single product by its ID
 * @param {string|number} id - product id
 * @returns {Promise<Object>} product data
 */
export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

/**
 * Get all product categories
 * @returns {Promise<Array>} list of category names
 */
export const getCategories = async () => {
  const response = await apiClient.get("/products/categories");
  return response.data;
};