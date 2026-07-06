import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function DarkModeToggle({ isDarkMode, onToggle }) {
  return (
    <button className="dark-mode-toggle" onClick={onToggle}>
      {isDarkMode ? <FiSun /> : <FiMoon />}
      {isDarkMode ? "Light" : "Dark"}
    </button>
  );
}
export default DarkModeToggle;
