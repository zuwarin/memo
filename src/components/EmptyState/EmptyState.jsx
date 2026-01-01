import './EmptyState.css';

const EmptyState = ({ onCreateMemo }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <svg
          className="empty-state-icon"
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
        <h2>メモが選択されていません</h2>
        <p>左のリストからメモを選択するか、新しいメモを作成してください</p>
        {onCreateMemo && (
          <button className="empty-state-button" onClick={onCreateMemo}>
            新しいメモを作成
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
