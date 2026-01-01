import { v4 as uuidv4 } from 'uuid';

/**
 * Create a new memo object
 * @param {string} title - Memo title
 * @param {string} content - Memo content (markdown)
 * @param {Array<string>} tags - Array of tags
 * @returns {Object} New memo object
 */
export const createMemo = (title = '', content = '', tags = []) => {
  const now = new Date().toISOString();

  return {
    id: uuidv4(),
    title: title || '無題のメモ',
    content,
    tags,
    createdAt: now,
    updatedAt: now
  };
};

/**
 * Update a memo object
 * @param {Object} memo - Original memo
 * @param {Object} updates - Properties to update
 * @returns {Object} Updated memo object
 */
export const updateMemo = (memo, updates) => {
  return {
    ...memo,
    ...updates,
    updatedAt: new Date().toISOString()
  };
};

/**
 * Sort memos by a given field
 * @param {Array<Object>} memos - Array of memos
 * @param {string} sortBy - Field to sort by ('updatedAt', 'createdAt', 'title')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array<Object>} Sorted memos
 */
export const sortMemos = (memos, sortBy = 'updatedAt', order = 'desc') => {
  const sorted = [...memos].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle string comparison for title
    if (sortBy === 'title') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    // Handle date comparison
    aValue = new Date(aValue).getTime();
    bValue = new Date(bValue).getTime();

    return order === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return sorted;
};

/**
 * Filter memos by search query
 * @param {Array<Object>} memos - Array of memos
 * @param {string} query - Search query
 * @returns {Array<Object>} Filtered memos
 */
export const filterMemosByQuery = (memos, query) => {
  if (!query || query.trim() === '') {
    return memos;
  }

  const lowercaseQuery = query.toLowerCase();

  return memos.filter(memo => {
    const titleMatch = memo.title.toLowerCase().includes(lowercaseQuery);
    const contentMatch = memo.content.toLowerCase().includes(lowercaseQuery);
    const tagMatch = memo.tags.some(tag =>
      tag.toLowerCase().includes(lowercaseQuery)
    );

    return titleMatch || contentMatch || tagMatch;
  });
};

/**
 * Filter memos by tags
 * @param {Array<Object>} memos - Array of memos
 * @param {Array<string>} selectedTags - Array of selected tags
 * @returns {Array<Object>} Filtered memos
 */
export const filterMemosByTags = (memos, selectedTags) => {
  if (!selectedTags || selectedTags.length === 0) {
    return memos;
  }

  return memos.filter(memo => {
    return selectedTags.some(tag => memo.tags.includes(tag));
  });
};

/**
 * Get all unique tags from memos
 * @param {Array<Object>} memos - Array of memos
 * @returns {Array<string>} Array of unique tags, sorted alphabetically
 */
export const getAllTags = (memos) => {
  const tagsSet = new Set();

  memos.forEach(memo => {
    memo.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort();
};

/**
 * Get tag counts
 * @param {Array<Object>} memos - Array of memos
 * @returns {Object} Object with tag names as keys and counts as values
 */
export const getTagCounts = (memos) => {
  const counts = {};

  memos.forEach(memo => {
    memo.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });

  return counts;
};

/**
 * Get excerpt from memo content
 * @param {string} content - Memo content
 * @param {number} maxLength - Maximum length of excerpt
 * @returns {string} Excerpt
 */
export const getExcerpt = (content, maxLength = 100) => {
  if (!content) {
    return '';
  }

  // Remove markdown formatting for clean excerpt
  const plainText = content
    .replace(/#+\s/g, '')        // Remove headers
    .replace(/\*\*/g, '')         // Remove bold
    .replace(/\*/g, '')           // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')  // Remove links, keep text
    .replace(/`/g, '')            // Remove code markers
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength) + '...';
};
