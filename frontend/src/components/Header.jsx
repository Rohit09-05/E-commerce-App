import React from "react";
import { Link } from "react-router-dom";
import cartIcon from "../assets/cart.png";
import SearchBar from "./SearchBar"; // Adjust path if necessary

function Header({ onSearch }) {
  return (
    <header className="bg-white shadow-md">
      <nav className="w-full flex items-center justify-between py-4 px-8">
        {/* LEFT: Cart + Brand (far edge) */}
        <div className="flex items-center space-x-3">
          <Link to="/cart" aria-label="Cart">
            <img src={cartIcon} alt="Cart" className="h-8 w-8 object-contain" />
          </Link>
          <Link to="/" className="text-2xl font-bold text-black-600">
            Shoppy-Era
          </Link>
        </div>

        {/* CENTER: Extra-wide SearchBar */}
        <div className="flex-1 flex justify-center mx-8">
          <div className="w-full max-w-3xl"> {/* Extra wide! */}
            <SearchBar placeholder="Search products..." onSearch={onSearch} />
          </div>
        </div>

        {/* RIGHT: Nav at far edge */}
        <div className="flex items-center px-6 py-1 border border-gray-300 rounded-full bg-white shadow-sm space-x-6">
          <Link to="/" className="px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white transition">Home</Link>
          <Link to="/form" className="px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white transition">Enquiry Form</Link>
          <Link to="/admin" className="px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white transition">Admin</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
