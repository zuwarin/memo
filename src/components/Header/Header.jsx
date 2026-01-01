import { useMemoContext } from '../../contexts/MemoContext';
import { VIEW_MODES } from '../../constants';
import './Header.css';

const Header = () => {
  const { createAndSelectMemo, viewMode, setViewMode } = useMemoContext();

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          メモ帳
        </h1>
      </div>

      <div className="header-actions">
        <div className="view-mode-toggle">
          <button
            className={`view-mode-button ${viewMode === VIEW_MODES.EDIT ? 'active' : ''}`}
            onClick={() => setViewMode(VIEW_MODES.EDIT)}
            title="編集モード"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={`view-mode-button ${viewMode === VIEW_MODES.SPLIT ? 'active' : ''}`}
            onClick={() => setViewMode(VIEW_MODES.SPLIT)}
            title="分割モード"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="12" y1="3" x2="12" y2="21" />
            </svg>
          </button>
          <button
            className={`view-mode-button ${viewMode === VIEW_MODES.PREVIEW ? 'active' : ''}`}
            onClick={() => setViewMode(VIEW_MODES.PREVIEW)}
            title="プレビューモード"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>

        <button className="new-memo-button" onClick={createAndSelectMemo}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          新規メモ
        </button>
      </div>
    </header>
  );
};

export default Header;
