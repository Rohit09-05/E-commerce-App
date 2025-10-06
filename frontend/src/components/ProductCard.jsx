import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const descLimit = 100;
  const truncated =
    product.description.length > descLimit
      ? product.description.slice(0, descLimit) + "..."
      : product.description;

  return (
    <div className="rounded-3xl shadow-xl bg-gradient-to-br from-white via-blue-50 to-pink-50 px-8 py-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl w-full h-full">
      <div className="w-full flex-1 flex items-center justify-center mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-contain rounded-2xl bg-white shadow-lg"
          style={{ maxWidth: "340px" }}
        />
      </div>
      <h3 className="font-bold text-xl text-blue-700 mb-1 text-center">
        {product.name}
      </h3>
      <p className="text-gray-700 mb-2 text-center">
        {product.description.length > descLimit ? (
          <>
            {truncated}
            <Link
              to={`/product/${product._id || product.id}`}
              className="text-blue-600 hover:underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </Link>
          </>
        ) : (
          product.description
        )}
      </p>
      <p className="font-bold text-pink-600 mb-4 text-center">
        ${product.price}
      </p>
      <Link
        to={`/product/${product._id || product.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex justify-center"
      >
        <button className="bg-blue-600 text-white py-2 px-7 rounded-full font-semibold hover:bg-pink-600 transition shadow">
          Buy Now
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
