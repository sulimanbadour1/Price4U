"use client";
import React from "react";

const SearchBar = () => {
  const handleSubmit = () => {};
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        className="searchbar-input"
        type="text"
        placeholder="Search for products"
      />
      <button
        className="bg-primary text-white font-bold rounded-md px-6 py-4 hover:bg-black transition-all"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
