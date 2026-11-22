import { parse } from 'yaml';
import raw from '../data/site.yaml?raw';

/** All site content, parsed once from src/data/site.yaml. */
export const site: any = parse(raw);

/** True when a value is missing or literally "TBD". */
export function isTBD(v: unknown): boolean {
  return v === undefined || v === null || String(v).trim() === '' || String(v).trim() === 'TBD';
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Tiny inline-markup renderer: **bold**, *italic*, `code`,
 * [text](url), and the word TBD as a subtle badge.
 */
export function md(input: unknown): string {
  if (isTBD(input)) return '<span class="tbd">TBD</span>';
  let s = esc(String(input));
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, url) => {
    const ext = /^https?:/.test(url);
    return `<a href="${url}"${ext ? ' rel="noopener"' : ''}>${text}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/\bTBD\b/g, '<span class="tbd">TBD</span>');
  return s;
}

/** Initials for placeholder avatars, e.g. "Steven Euijong Whang" -> "SW". */
export function initials(name: string): string {
  if (isTBD(name)) return '?';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export const lastUpdated = new Date().toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Chicago',
});

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/cfp/', label: 'Call for Papers' },
  { href: '/program/', label: 'Program' },
  { href: '/speakers/', label: 'Speakers' },
  { href: '/organizers/', label: 'Organizers' },
  { href: '/papers/', label: 'Accepted Papers' },
  { href: '/contact/', label: 'Contact' },
];

