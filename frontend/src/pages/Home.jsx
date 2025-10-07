import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import BannerCarousel from "../components/BannerCarousel";
import { fetchProducts } from "../api/products"; // <-- import your API utility

function Home({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const productsArray = await fetchProducts();
      if (Array.isArray(productsArray)) {
        setProducts(productsArray);
      } else {
        // Log for debugging -- product API did not return an array!
        console.log("API /products did not return an array:", productsArray);
        setProducts([]);
      }
      setLoading(false);
    }
    loadProducts();
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
