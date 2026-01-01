const TagFilter = ({ allTags, selectedTags, onToggleTag, tagCounts }) => {
  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <h3 className="tag-filter-title">タグでフィルタ</h3>
      <div className="tag-filter-list">
        {allTags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          const count = tagCounts[tag] || 0;

          return (
            <button
              key={tag}
              className={`tag-filter-item ${isSelected ? 'active' : ''}`}
              onClick={() => onToggleTag(tag)}
            >
              <span className="tag-filter-name">{tag}</span>
              <span className="tag-filter-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagFilter;
