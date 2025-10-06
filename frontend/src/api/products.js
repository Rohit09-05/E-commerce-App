import axios from "axios";

// Base URL for backend API
const BASE_URL = process.env.REACT_APP_API_URL || "";

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/api/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/products/${id}`);
  return response.data;
};

// Add more product related API calls here (create, update, delete)
