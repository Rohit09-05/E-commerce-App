import React, { useState } from "react";
import axios from "axios";

export default function AddProductModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    if (!form.name || !form.imageUrl || !form.price) {
      setErrorMsg("Name, Image URL, and Price are required.");
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/products", {
        ...form,
        price: Number(form.price)
      });
      setForm({ name: "", imageUrl: "", description: "", price: "" });
      setLoading(false);
      onSave();
      onClose();
    } catch (err) {
      setLoading(false);
      setErrorMsg("Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 font-bold text-xl text-center">Add Product</h2>
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
            {loading ? "Adding..." : "Add"}
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
