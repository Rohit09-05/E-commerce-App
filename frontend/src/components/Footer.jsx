import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p>Shoppy-Era: India's best platform for electronics, books, and more. Trusted quality shopping for your needs.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><Link to="/products" className="hover:text-white">All Products</Link></li>
            <li><Link to="/categories/electronics" className="hover:text-white">Electronics</Link></li>
            <li><Link to="/categories/books" className="hover:text-white">Books</Link></li>
            <li><Link to="/categories/home" className="hover:text-white">Home & Kitchen</Link></li>
            <li><Link to="/sale" className="hover:text-white">Sale</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-white">Returns</Link></li>
            <li><Link to="/shipping" className="hover:text-white">Shipping Info</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
            <li><a href="mailto:support@shoppy-era.com" className="hover:text-white">Email</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-600 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Shoppy-Era. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
