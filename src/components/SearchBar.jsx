import React from "react";

function SearchBar({ searchText, onSearchChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search tasks..."
      value={searchText}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
}

export default SearchBar;
