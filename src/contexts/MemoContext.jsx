import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMemos } from '../hooks/useMemos';
import { useSearch } from '../hooks/useSearch';
import { STORAGE_KEY, VIEW_MODES } from '../constants';

// Create context
const MemoContext = createContext(null);

// Provider component
export const MemoProvider = ({ children }) => {
  // LocalStorage state
  const [storedData, setStoredData] = useLocalStorage(STORAGE_KEY, {
    memos: [],
    settings: { viewMode: VIEW_MODES.SPLIT }
  });

  // Extract memos and settings
  const memos = storedData.memos || [];
  const settings = storedData.settings || { viewMode: VIEW_MODES.SPLIT };

  // Set memos helper
  const setMemos = useCallback((memosOrUpdater) => {
    setStoredData(prev => ({
      ...prev,
      memos: typeof memosOrUpdater === 'function'
        ? memosOrUpdater(prev.memos || [])
        : memosOrUpdater
    }));
  }, [setStoredData]);

  // Search and filter state
  const [searchQuery, debouncedSearchQuery, setSearchQuery] = useSearch();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMemoId, setSelectedMemoId] = useState(null);
  const [viewMode, setViewModeState] = useState(settings.viewMode);

  // Memo operations and filtered data
  const memoOps = useMemos(memos, setMemos, debouncedSearchQuery, selectedTags);

  // Update view mode and persist to localStorage
  const setViewMode = useCallback((mode) => {
    setViewModeState(mode);
    setStoredData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        viewMode: mode
      }
    }));
  }, [setStoredData]);

  // Toggle tag filter
  const toggleTagFilter = useCallback((tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
  }, [setSearchQuery]);

  // Select memo
  const selectMemo = useCallback((memoId) => {
    setSelectedMemoId(memoId);
  }, []);

  // Create new memo and select it
  const createAndSelectMemo = useCallback(() => {
    const newMemo = memoOps.addMemo();
    setSelectedMemoId(newMemo.id);
    return newMemo;
  }, [memoOps]);

  // Delete memo and handle selection
  const deleteMemo = useCallback((memoId) => {
    memoOps.removeMemo(memoId);

    // If deleted memo was selected, clear selection
    if (selectedMemoId === memoId) {
      setSelectedMemoId(null);
    }
  }, [memoOps, selectedMemoId]);

  // Get currently selected memo
  const selectedMemo = selectedMemoId ? memoOps.getMemoById(selectedMemoId) : null;

  // Context value
  const value = {
    // State
    memos,
    filteredMemos: memoOps.filteredMemos,
    selectedMemo,
    selectedMemoId,
    searchQuery,
    debouncedSearchQuery,
    selectedTags,
    viewMode,
    allTags: memoOps.allTags,
    tagCounts: memoOps.tagCounts,
    totalMemos: memoOps.totalMemos,
    filteredCount: memoOps.filteredCount,

    // Actions
    addMemo: memoOps.addMemo,
    modifyMemo: memoOps.modifyMemo,
    removeMemo: memoOps.removeMemo,
    getMemoById: memoOps.getMemoById,
    duplicateMemo: memoOps.duplicateMemo,
    createAndSelectMemo,
    deleteMemo,
    selectMemo,
    setSearchQuery,
    toggleTagFilter,
    clearFilters,
    setViewMode
  };

  return (
    <MemoContext.Provider value={value}>
      {children}
    </MemoContext.Provider>
  );
};

// Custom hook to use the context
export const useMemoContext = () => {
  const context = useContext(MemoContext);

  if (!context) {
    throw new Error('useMemoContext must be used within a MemoProvider');
  }

  return context;
};
