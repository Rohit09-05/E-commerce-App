import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditProductModal({ isOpen, onClose, product, onSave }) {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        imageUrl: product.imageUrl || "",
        description: product.description || "",
        price: product.price || ""
      });
      setErrorMsg("");
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      // PUT /api/products/:id
      const { data } = await axios.put(`/api/products/${product._id}`, form);
      onSave(data); // refresh main products list
      onClose();
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || "Failed to update product"
      );
    }
    setLoading(false);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 font-bold text-xl text-center">
          Edit Product
        </h2>
        {errorMsg && (
          <div className="mb-2 text-red-600 text-sm">{errorMsg}</div>
        )}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-2 w-full border px-2 py-1"
          required
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="mb-2 w-full border px-2 py-1"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="mb-2 w-full border px-2 py-1"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="mb-4 w-full border px-2 py-1"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
