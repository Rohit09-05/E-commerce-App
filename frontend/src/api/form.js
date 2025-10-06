import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "";

export const submitForm = async (formData) => {
  const response = await axios.post(`${BASE_URL}/api/form`, formData);
  return response.data;
};
