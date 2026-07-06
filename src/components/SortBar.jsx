import React from "react";
import { FiSliders } from "react-icons/fi";

function SortBar({ sortBy, onSortChange }) {
  return (
    <div className="sort-wrapper">
      <FiSliders className="sort-icon" />
      <select
        className="sort-select"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
        <option value="alphabetical">A → Z</option>
      </select>
      <span className="sort-arrow">▾</span>
    </div>
  );
}
export default SortBar;
