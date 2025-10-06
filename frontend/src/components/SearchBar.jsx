import React from "react";

function SearchBar({ placeholder, onSearch }) {
  const handleChange = (e) => onSearch(e.target.value);
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default SearchBar;
