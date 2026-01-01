import { useState } from 'react';

const TagInput = ({ tags = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();

      // Don't add duplicate tags
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }

      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag on backspace if input is empty
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="tag-input-container">
      <div className="tag-chips">
        {tags.map(tag => (
          <div key={tag} className="tag-chip">
            <span className="tag-chip-text">{tag}</span>
            <button
              className="tag-chip-remove"
              onClick={() => removeTag(tag)}
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          className="tag-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? 'タグを追加 (Enterで確定)' : ''}
        />
      </div>
    </div>
  );
};

export default TagInput;
