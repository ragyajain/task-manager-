import { useState, useEffect } from "react";

function useLocalStorage(storageKey, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(storageKey);
    return savedValue !== null ? JSON.parse(savedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
