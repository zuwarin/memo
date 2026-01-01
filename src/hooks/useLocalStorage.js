import { useState, useEffect, useCallback } from 'react';
import { getStoredData, saveStoredData } from '../utils/localStorage';

/**
 * Custom hook for localStorage synchronization
 * @param {string} key - Storage key (not used directly, but kept for API consistency)
 * @param {*} initialValue - Initial value if no stored data exists
 * @returns {Array} [storedValue, setValue, isLoading]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const data = getStoredData();
      return data || initialValue;
    } catch (error) {
      console.error('Error reading initial localStorage:', error);
      return initialValue;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Save to localStorage whenever storedValue changes
  useEffect(() => {
    setIsLoading(true);
    try {
      saveStoredData(storedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [storedValue]);

  // Listen for storage events (for multi-tab synchronization)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue);
          setStoredValue(newData);
        } catch (error) {
          console.error('Error parsing storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  const setValue = useCallback((value) => {
    setStoredValue(prevValue => {
      // Allow function updates like setState
      const newValue = value instanceof Function ? value(prevValue) : value;
      return newValue;
    });
  }, []);

  return [storedValue, setValue, isLoading];
};
