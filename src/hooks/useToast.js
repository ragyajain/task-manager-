import { useState, useCallback } from "react";

/*
  useToast — Custom hook for displaying temporary notification toasts.
  Returns:
    toasts     -> array of active toast objects
    addToast   -> call this to show a new toast (message, type)
  
  Each toast disappears automatically after 3 seconds.
*/
function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();

    // Add the new toast to the list
    setToasts((prev) => [...prev, { id, message, type }]);

    // Schedule auto-removal after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return { toasts, addToast };
}

export default useToast;
