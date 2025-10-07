import axios from "axios";

// Base URL for backend API
const BASE_URL = process.env.REACT_APP_API_URL || "";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.log("fetchProducts: /api/products did not return array", response.data);
      return [];
    }
  } catch (err) {
    console.log("fetchProducts Error:", err);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/${id}`);
    return response.data || null;
  } catch (err) {
    console.log(`fetchProductById Error (id: ${id}):`, err);
    return null;
  }
};

// Add more product related API calls here
