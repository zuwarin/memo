import { useMemoContext } from '../../contexts/MemoContext';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import MemoList from './MemoList';
import './Sidebar.css';

const Sidebar = () => {
  const {
    filteredMemos,
    selectedMemoId,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTagFilter,
    allTags,
    tagCounts,
    selectMemo,
    filteredCount,
    totalMemos
  } = useMemoContext();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <div className="sidebar-stats">
          {searchQuery || selectedTags.length > 0 ? (
            <span>{filteredCount} / {totalMemos} 件</span>
          ) : (
            <span>{totalMemos} 件のメモ</span>
          )}
        </div>
      </div>

      {allTags.length > 0 && (
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTagFilter}
          tagCounts={tagCounts}
        />
      )}

      <MemoList
        memos={filteredMemos}
        selectedMemoId={selectedMemoId}
        onSelectMemo={selectMemo}
      />
    </div>
  );
};

export default Sidebar;
