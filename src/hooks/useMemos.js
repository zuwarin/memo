import { useMemo, useCallback } from 'react';
import {
  createMemo,
  updateMemo,
  sortMemos,
  filterMemosByQuery,
  filterMemosByTags,
  getAllTags,
  getTagCounts
} from '../utils/memoHelpers';

/**
 * Custom hook for memo operations and filtering
 * @param {Array} memos - Array of memo objects
 * @param {Function} setMemos - Function to update memos
 * @param {string} searchQuery - Search query string
 * @param {Array} selectedTags - Array of selected tag filters
 * @param {string} sortBy - Field to sort by
 * @returns {Object} Memo operations and filtered data
 */
export const useMemos = (memos, setMemos, searchQuery = '', selectedTags = [], sortBy = 'updatedAt') => {
  // Filtered and sorted memos
  const filteredMemos = useMemo(() => {
    let result = [...memos];

    // Apply tag filter
    if (selectedTags.length > 0) {
      result = filterMemosByTags(result, selectedTags);
    }

    // Apply search filter
    if (searchQuery) {
      result = filterMemosByQuery(result, searchQuery);
    }

    // Sort memos
    result = sortMemos(result, sortBy, 'desc');

    return result;
  }, [memos, searchQuery, selectedTags, sortBy]);

  // Get all unique tags
  const allTags = useMemo(() => getAllTags(memos), [memos]);

  // Get tag counts
  const tagCounts = useMemo(() => getTagCounts(memos), [memos]);

  // Create a new memo
  const addMemo = useCallback((title = '', content = '', tags = []) => {
    const newMemo = createMemo(title, content, tags);
    setMemos(prevMemos => [newMemo, ...prevMemos]);
    return newMemo;
  }, [setMemos]);

  // Update an existing memo
  const modifyMemo = useCallback((memoId, updates) => {
    setMemos(prevMemos =>
      prevMemos.map(memo =>
        memo.id === memoId ? updateMemo(memo, updates) : memo
      )
    );
  }, [setMemos]);

  // Delete a memo
  const removeMemo = useCallback((memoId) => {
    setMemos(prevMemos => prevMemos.filter(memo => memo.id !== memoId));
  }, [setMemos]);

  // Get a single memo by ID
  const getMemoById = useCallback((memoId) => {
    return memos.find(memo => memo.id === memoId);
  }, [memos]);

  // Duplicate a memo
  const duplicateMemo = useCallback((memoId) => {
    const memo = getMemoById(memoId);
    if (memo) {
      const newMemo = createMemo(
        `${memo.title} (コピー)`,
        memo.content,
        [...memo.tags]
      );
      setMemos(prevMemos => [newMemo, ...prevMemos]);
      return newMemo;
    }
  }, [getMemoById, setMemos]);

  return {
    // Filtered data
    filteredMemos,
    allTags,
    tagCounts,

    // CRUD operations
    addMemo,
    modifyMemo,
    removeMemo,
    getMemoById,
    duplicateMemo,

    // Stats
    totalMemos: memos.length,
    filteredCount: filteredMemos.length
  };
};
