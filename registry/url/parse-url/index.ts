export interface ParsedUrl {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
}

/**
 * Parses a URL string into its component parts.
 *
 * Breaks down a URL into its constituent components like protocol, host, path,
 * query parameters, and hash. Returns null if the URL is invalid.
 *
 * @tags pure, url
 * @param {string} url The URL string to parse
 * @returns {ParsedUrl | null} Parsed URL components or null if invalid
 *
 * @example
 * ```typescript
 * parseUrl('https://example.com:8080/path?query=value#hash');
 * // {
 * //   protocol: 'https:',
 * //   host: 'example.com:8080',
 * //   hostname: 'example.com',
 * //   port: '8080',
 * //   pathname: '/path',
 * //   search: '?query=value',
 * //   hash: '#hash',
 * //   origin: 'https://example.com:8080'
 * // }
 *
 * parseUrl('invalid-url'); // null
 * parseUrl('http://localhost/api'); // { protocol: 'http:', host: 'localhost', ... }
 * ```
 */
export function parseUrl(url: string): ParsedUrl | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const parsed = new URL(url);

    return {
      protocol: parsed.protocol,
      host: parsed.host,
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: parsed.pathname,
      search: parsed.search,
      hash: parsed.hash,
      origin: parsed.origin,
    };
  } catch {
    return null;
  }
}
