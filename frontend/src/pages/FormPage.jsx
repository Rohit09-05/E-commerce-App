import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product_id: "",
    product_name: "",
    comments: "",
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Use environment variable to always hit correct backend
  const BASE_URL = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setProducts([]);
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update product selection as well as product_name
    if (name === "product_id") {
      const selectedProduct = products.find(p => p._id === value);
      setFormData({
        ...formData,
        product_id: value,
        product_name: selectedProduct ? selectedProduct.name : "",
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${BASE_URL}/api/orders`, formData);
      setLoading(false);
      navigate("/thank-you");
    } catch (err) {
      setLoading(false);
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Product Interest Form</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        {/* Product Dropdown */}
        <div>
          <label htmlFor="product_id" className="block font-semibold mb-1">Product Interested In</label>
          <select id="product_id" name="product_id" value={formData.product_id} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Select a product --</option>
            {(Array.isArray(products) ? products : []).map(product => (
              <option key={product._id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </div>
        {/* Comments */}
        <div>
          <label htmlFor="comments" className="block font-semibold mb-1">Comments</label>
          <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
        </div>
        {/* Submit */}
        <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-300">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default FormPage;
