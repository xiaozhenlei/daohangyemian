import { Bookmark } from '../types';

/**
 * Parses a Netscape Bookmark HTML file content (standard export from Chrome/Edge)
 */
export const parseBookmarksHTML = (htmlContent: string): Bookmark[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const links = Array.from(doc.querySelectorAll('a'));

  return links.map((link) => {
    return {
      id: crypto.randomUUID(),
      title: link.textContent || link.getAttribute('href') || 'Untitled',
      url: link.getAttribute('href') || '',
      createdAt: Date.now(),
    };
  }).filter(b => b.url.startsWith('http')); // Basic validation
};