import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Replace `/api/products/${id}` with your backend endpoint
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8 text-xl">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-8 text-xl">Product not found.</div>;
  }

  return (
    <section className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full max-h-96 object-contain mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-2xl font-semibold text-blue-600 mb-6">${product.price}</p>
      <button
        onClick={() => alert("Buy Now functionality coming soon!")}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        Buy Now
      </button>
    </section>
  );
}

export default ProductPage;
