import { STORAGE_KEY, STORAGE_VERSION, DEFAULT_SETTINGS } from '../constants';

/**
 * Get data from localStorage
 * @returns {Object} The stored data or default structure
 */
export const getStoredData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return createDefaultData();
    }

    const parsed = JSON.parse(data);

    // Validate and migrate if necessary
    if (parsed.version !== STORAGE_VERSION) {
      return migrateData(parsed);
    }

    return parsed;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return createDefaultData();
  }
};

/**
 * Save data to localStorage
 * @param {Object} data - The data to save
 * @returns {boolean} Success status
 */
export const saveStoredData = (data) => {
  try {
    const dataWithVersion = {
      ...data,
      version: STORAGE_VERSION,
      lastModified: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataWithVersion));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);

    // Check if quota exceeded
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
    }

    return false;
  }
};

/**
 * Create default data structure
 * @returns {Object} Default data structure
 */
const createDefaultData = () => ({
  version: STORAGE_VERSION,
  memos: [],
  settings: DEFAULT_SETTINGS,
  lastModified: new Date().toISOString()
});

/**
 * Migrate data from old versions (placeholder for future use)
 * @param {Object} oldData - Old data structure
 * @returns {Object} Migrated data
 */
const migrateData = (oldData) => {
  console.warn('Migrating data from version', oldData.version, 'to', STORAGE_VERSION);
  // For now, just return default structure
  // Future: implement actual migration logic
  return createDefaultData();
};

/**
 * Clear all stored data
 */
export const clearStoredData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Export data as JSON string (for backup/download)
 * @returns {string} JSON string of all data
 */
export const exportData = () => {
  const data = getStoredData();
  return JSON.stringify(data, null, 2);
};

/**
 * Import data from JSON string
 * @param {string} jsonString - JSON string to import
 * @returns {boolean} Success status
 */
export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    return saveStoredData(data);
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

/**
 * Get storage size estimate in bytes
 * @returns {number} Estimated size in bytes
 */
export const getStorageSize = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Blob([data]).size : 0;
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
};
