import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import BannerCarousel from "../components/BannerCarousel";
import axios from "axios";

function Home({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/api/products");
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.log("API /products returned:", res.data);
          setProducts([]);
        }
      } catch (err) {
        console.log("API /products error:", err);
        setProducts([]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = Array.isArray(products)
    ? products.filter(product =>
        (product.name || "").toLowerCase().includes((searchQuery || "").toLowerCase())
      )
    : [];

  if (loading) {
    return <div className="text-center py-8 text-xl">Loading products...</div>;
  }

  return (
    <section>
      <BannerCarousel />
      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
        {filteredProducts.map(product => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Home;
