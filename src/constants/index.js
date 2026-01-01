// LocalStorage keys
export const STORAGE_KEY = 'memo-app-data';

// View modes
export const VIEW_MODES = {
  EDIT: 'edit',
  SPLIT: 'split',
  PREVIEW: 'preview'
};

// Default settings
export const DEFAULT_SETTINGS = {
  viewMode: VIEW_MODES.SPLIT
};

// Storage version for future migrations
export const STORAGE_VERSION = '1.0';

// Debounce delays (ms)
export const SEARCH_DEBOUNCE_DELAY = 300;
export const AUTOSAVE_DEBOUNCE_DELAY = 1500;
