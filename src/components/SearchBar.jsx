import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ searchText, onSearchChange }) {
  return (
    <div className="search-wrapper">
      <FiSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
export default SearchBar;
