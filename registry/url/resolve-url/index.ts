/**
 * Resolves a relative URL against a base URL.
 *
 * Takes a relative URL and resolves it against a base URL using the native URL constructor.
 * Handles various URL formats including absolute URLs, protocol-relative URLs, and complex
 * relative paths with .. and ./ references.
 *
 * @param relativeUrl The relative URL to resolve
 * @param baseUrl The base URL to resolve against
 * @returns The resolved absolute URL
 * @throws {Error} If either URL is invalid or malformed
 *
 * @example
 * ```typescript
 * resolveUrl('page.html', 'https://example.com/base/');
 * // 'https://example.com/base/page.html'
 *
 * resolveUrl('../other.html', 'https://example.com/base/page.html');
 * // 'https://example.com/other.html'
 *
 * resolveUrl('/absolute/path', 'https://example.com/base/page.html');
 * // 'https://example.com/absolute/path'
 *
 * resolveUrl('https://other.com/page.html', 'https://example.com/base/');
 * // 'https://other.com/page.html' (absolute URLs returned unchanged)
 * ```
 */
export function resolveUrl(relativeUrl: string, baseUrl: string): string {
  // Validate relative URL type
  if (typeof relativeUrl !== 'string') {
    throw new Error('Invalid relative URL');
  }

  // Validate base URL type
  if (typeof baseUrl !== 'string') {
    throw new Error('Invalid base URL');
  }

  // Special case: empty relative URL with empty base URL should throw relative URL error
  if (relativeUrl === '' && baseUrl.trim() === '') {
    throw new Error('Invalid relative URL');
  }

  // Handle empty base URL
  if (baseUrl.trim() === '') {
    throw new Error('Invalid base URL');
  }

  try {
    // Handle absolute URLs - return them unchanged
    if (isAbsoluteUrl(relativeUrl)) {
      return relativeUrl;
    }

    // Use native URL constructor to resolve
    const resolved = new URL(relativeUrl, baseUrl);
    return resolved.href;
  } catch {
    throw new Error('Failed to resolve URL');
  }
}

/**
 * Checks if a URL is absolute (has a protocol).
 *
 * @param url The URL to check
 * @returns True if the URL is absolute, false otherwise
 */
function isAbsoluteUrl(url: string): boolean {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
}
