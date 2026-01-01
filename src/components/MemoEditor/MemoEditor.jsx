import { useState, useEffect, useCallback } from 'react';
import { useMemoContext } from '../../contexts/MemoContext';
import { VIEW_MODES, AUTOSAVE_DEBOUNCE_DELAY } from '../../constants';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';
import TagInput from './TagInput';
import EmptyState from '../EmptyState/EmptyState';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import './MemoEditor.css';

const MemoEditor = () => {
  const {
    selectedMemo,
    modifyMemo,
    deleteMemo,
    viewMode,
    createAndSelectMemo
  } = useMemoContext();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved'

  // Sync local state with selected memo
  useEffect(() => {
    if (selectedMemo) {
      setTitle(selectedMemo.title);
      setContent(selectedMemo.content);
      setTags(selectedMemo.tags);
      setSaveStatus('saved');
    }
  }, [selectedMemo]);

  // Auto-save with debounce
  useEffect(() => {
    if (!selectedMemo) return;

    // Check if anything changed
    const hasChanges =
      title !== selectedMemo.title ||
      content !== selectedMemo.content ||
      JSON.stringify(tags) !== JSON.stringify(selectedMemo.tags);

    if (!hasChanges) return;

    setSaveStatus('saving');

    const timer = setTimeout(() => {
      modifyMemo(selectedMemo.id, { title, content, tags });
      setSaveStatus('saved');
    }, AUTOSAVE_DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [title, content, tags, selectedMemo, modifyMemo]);

  const handleDelete = useCallback(() => {
    if (selectedMemo) {
      deleteMemo(selectedMemo.id);
      setDeleteDialogOpen(false);
    }
  }, [selectedMemo, deleteMemo]);

  if (!selectedMemo) {
    return <EmptyState onCreateMemo={createAndSelectMemo} />;
  }

  const showEditor = viewMode === VIEW_MODES.EDIT || viewMode === VIEW_MODES.SPLIT;
  const showPreview = viewMode === VIEW_MODES.PREVIEW || viewMode === VIEW_MODES.SPLIT;

  return (
    <div className="memo-editor-container">
      <div className="memo-editor-header">
        <div className="memo-editor-header-top">
          <input
            type="text"
            className="memo-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="メモのタイトル"
          />
          <div className="memo-editor-actions">
            <span className="memo-save-status">
              {saveStatus === 'saving' ? '保存中...' : '保存済み'}
            </span>
            <button
              className="memo-delete-button"
              onClick={() => setDeleteDialogOpen(true)}
              aria-label="メモを削除"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
        <TagInput tags={tags} onChange={setTags} />
      </div>

      <div className={`memo-editor-content ${viewMode}`}>
        {showEditor && (
          <MarkdownEditor
            value={content}
            onChange={setContent}
          />
        )}
        {showPreview && (
          <MarkdownPreview content={content} />
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="メモを削除"
        message="このメモを削除してもよろしいですか？この操作は取り消せません。"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        confirmText="削除"
        cancelText="キャンセル"
      />
    </div>
  );
};

export default MemoEditor;
