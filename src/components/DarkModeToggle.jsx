import React from "react";
  
function DarkModeToggle({ isDarkMode, onToggle }) {
  return (
    <button className="dark-mode-toggle" onClick={onToggle}>
      {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
