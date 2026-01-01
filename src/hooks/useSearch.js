import { useState, useEffect } from 'react';
import { SEARCH_DEBOUNCE_DELAY } from '../constants';

/**
 * Custom hook for debounced search
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {Array} [searchQuery, debouncedQuery, setSearchQuery]
 */
export const useSearch = (delay = SEARCH_DEBOUNCE_DELAY) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    // Set up debounce timer
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    // Cleanup timer on searchQuery change
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, delay]);

  return [searchQuery, debouncedQuery, setSearchQuery];
};
