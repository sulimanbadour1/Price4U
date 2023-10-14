"use client";
import React, { FormEvent, useState } from "react";
//  TODO: Add validation for amazon product URL

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    // Check if hostname includes amazon in it
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazaon.") ||
      hostname.includes("amazon.co") ||
      hostname.includes("amazon.de")
    ) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};
const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");

  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();
    console.log(searchPrompt);
    setSearchPrompt("");
    // clear the form input after submission
    const isValid = isValidAmazonProductURL(searchPrompt);
    // TODO: Redirect to product page
    // alert(isValid ? "Valid URL" : "Invalid URL");
    if (!isValid) {
      alert("please enter a valid amazon product URL");
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        className="searchbar-input"
        type="text"
        placeholder="Search for products"
      />
      <button className="searchbar-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
