import { memo } from 'react';
import { formatRelativeTime } from '../../utils/dateFormatter';
import { getExcerpt } from '../../utils/memoHelpers';

const MemoListItem = memo(({ memo, isSelected, onClick }) => {
  return (
    <div
      className={`memo-list-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="memo-list-item-header">
        <h4 className="memo-list-item-title">
          {memo.title || '無題のメモ'}
        </h4>
        <span className="memo-list-item-time">
          {formatRelativeTime(memo.updatedAt)}
        </span>
      </div>
      {memo.content && (
        <p className="memo-list-item-excerpt">
          {getExcerpt(memo.content, 80)}
        </p>
      )}
      {memo.tags && memo.tags.length > 0 && (
        <div className="memo-list-item-tags">
          {memo.tags.slice(0, 3).map(tag => (
            <span key={tag} className="memo-list-item-tag">
              {tag}
            </span>
          ))}
          {memo.tags.length > 3 && (
            <span className="memo-list-item-tag-more">
              +{memo.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

MemoListItem.displayName = 'MemoListItem';

const MemoList = ({ memos, selectedMemoId, onSelectMemo }) => {
  if (memos.length === 0) {
    return (
      <div className="memo-list-empty">
        <p>メモが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="memo-list">
      {memos.map(memo => (
        <MemoListItem
          key={memo.id}
          memo={memo}
          isSelected={memo.id === selectedMemoId}
          onClick={() => onSelectMemo(memo.id)}
        />
      ))}
    </div>
  );
};

export default MemoList;
