import { useMemo } from 'react';
import { markdownToHtml } from '../../utils/markdown';

const MarkdownPreview = ({ content }) => {
  const html = useMemo(() => markdownToHtml(content), [content]);

  return (
    <div className="markdown-preview">
      {html ? (
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="markdown-preview-empty">
          プレビューはここに表示されます
        </div>
      )}
    </div>
  );
};

export default MarkdownPreview;
