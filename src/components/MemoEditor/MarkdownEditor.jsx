const MarkdownEditor = ({ value, onChange, placeholder = 'マークダウンでメモを入力...' }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="markdown-editor">
      <textarea
        className="markdown-textarea"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
};

export default MarkdownEditor;
