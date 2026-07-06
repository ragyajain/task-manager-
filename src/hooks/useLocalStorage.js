import { useState, useEffect } from "react";

/*
  useLocalStorage — Custom hook that syncs state with the browser's
  Local Storage. Works identically to useState but persists across
  page reloads.

  storageKey   -> the key name in localStorage
  initialValue -> default value if nothing is saved yet
*/
function useLocalStorage(storageKey, initialValue) {
  // Read saved value once on first load (via a lazy initializer function)
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  // Whenever value changes, write it back to localStorage as JSON
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
