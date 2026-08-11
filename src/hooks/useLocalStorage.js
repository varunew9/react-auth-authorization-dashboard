import { useCallback, useEffect, useState } from "react";

const getStoredValue = (key, initialValue) => {
  try {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
  }

  return typeof initialValue === "function" ? initialValue() : initialValue;
};

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    getStoredValue(key, initialValue)
  );

  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((previousValue) => {
          const valueToStore =
            value instanceof Function ? value(previousValue) : value;

          window.localStorage.setItem(key, JSON.stringify(valueToStore));

          return valueToStore;
        });
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(
            event.newValue === null ? null : JSON.parse(event.newValue)
          );
        } catch (error) {
          console.error(
            `Error parsing cross-tab sync for key "${key}":`,
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
