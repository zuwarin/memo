import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Configure marked options
 */
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true,    // GitHub Flavored Markdown
});

/**
 * Convert markdown to sanitized HTML
 * @param {string} markdown - Raw markdown text
 * @returns {string} Sanitized HTML string
 */
export const markdownToHtml = (markdown) => {
  if (!markdown) {
    return '';
  }

  try {
    // Convert markdown to HTML
    const rawHtml = marked.parse(markdown);

    // Sanitize HTML to prevent XSS attacks
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'u', 's', 'code', 'pre',
        'ul', 'ol', 'li',
        'blockquote',
        'a',
        'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
      ALLOW_DATA_ATTR: false,
    });

    return cleanHtml;
  } catch (error) {
    console.error('Error converting markdown:', error);
    return '<p>Error rendering markdown</p>';
  }
};

/**
 * Extract plain text from markdown (for search)
 * @param {string} markdown - Raw markdown text
 * @returns {string} Plain text without markdown syntax
 */
export const markdownToPlainText = (markdown) => {
  if (!markdown) {
    return '';
  }

  try {
    // Convert to HTML first
    const html = marked.parse(markdown);

    // Remove HTML tags
    const text = html.replace(/<[^>]*>/g, '');

    // Decode HTML entities
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;

    return textarea.value;
  } catch (error) {
    console.error('Error extracting plain text:', error);
    return markdown;
  }
};
