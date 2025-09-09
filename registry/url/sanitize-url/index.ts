export interface SanitizeUrlOptions {
  /** Default protocol to use for protocol-relative URLs */
  defaultProtocol?: string;
  /** Allowed protocols (default: ['http', 'https', 'ftp', 'mailto']) */
  allowedProtocols?: string[];
  /** Whether to remove query parameters (default: false) */
  removeQuery?: boolean;
  /** Whether to remove hash fragments (default: false) */
  removeHash?: boolean;
}

/**
 * Sanitizes a URL by removing or encoding potentially dangerous elements.
 *
 * Cleans URLs to prevent XSS attacks and other security issues by removing
 * dangerous protocols, encoding special characters, and validating the URL
 * structure. Returns null if the URL cannot be safely sanitized.
 *
 * @param url The URL to sanitize
 * @param options Sanitization options
 * @returns Sanitized URL or null if unsafe
 *
 * @example
 * ```typescript
 * sanitizeUrl('https://example.com/path?query=value');
 * // 'https://example.com/path?query=value'
 *
 * sanitizeUrl('javascript:alert("xss")'); // null
 * sanitizeUrl('http://example.com/<script>');
 * // 'http://example.com/%3Cscript%3E'
 *
 * sanitizeUrl('//example.com/path', { defaultProtocol: 'https' });
 * // 'https://example.com/path'
 * ```
 */

export function sanitizeUrl(
  url: string,
  options: SanitizeUrlOptions = {}
): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const {
    defaultProtocol = 'https',
    allowedProtocols = ['http', 'https', 'ftp', 'mailto', 'tel', 'sms'],
    removeQuery = false,
    removeHash = false,
  } = options;

  try {
    let cleanUrl = url.trim();

    // Handle protocol-relative URLs
    if (cleanUrl.startsWith('//')) {
      cleanUrl = `${defaultProtocol}:${cleanUrl}`;
    }

    // Handle URLs without protocol
    if (!cleanUrl.includes('://')) {
      // For URLs that look like they already have a protocol (like mailto:, tel:)
      if (cleanUrl.includes(':') && !cleanUrl.startsWith('//')) {
        // Check if it's a special protocol
        const possibleProtocol = cleanUrl.split(':')[0].toLowerCase();
        if (['mailto', 'tel', 'sms'].includes(possibleProtocol)) {
          // Keep as-is for special protocols
        } else {
          // Assume it's host:port format
          cleanUrl = `${defaultProtocol}://${cleanUrl}`;
        }
      } else {
        cleanUrl = `${defaultProtocol}://${cleanUrl}`;
      }
    }

    const parsed = new URL(cleanUrl);

    // Check for dangerous protocols
    const protocol = parsed.protocol.slice(0, -1).toLowerCase();
    if (!allowedProtocols.includes(protocol)) {
      return null;
    }

    // Reconstruct the URL to ensure proper encoding
    let sanitized: string;

    // Handle special protocols that don't follow standard URL structure
    if (['mailto', 'tel', 'sms'].includes(protocol)) {
      sanitized = cleanUrl; // Keep original format for these protocols
    } else {
      sanitized = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;

      // Handle query parameters
      if (parsed.search && !removeQuery) {
        sanitized += parsed.search;
      }

      // Handle hash fragments
      if (parsed.hash && !removeHash) {
        sanitized += parsed.hash;
      }
    }

    // Additional validation
    if (!isValidSanitizedUrl(sanitized)) {
      return null;
    }

    return sanitized;
  } catch {
    return null;
  }
}

function isValidSanitizedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);

    // Check for suspicious patterns in the URL string
    const urlToCheck = url.toLowerCase();

    // For protocols that don't follow standard URL structure, just check for basic safety
    const protocol = parsed.protocol.slice(0, -1).toLowerCase();
    if (['mailto', 'tel', 'sms'].includes(protocol)) {
      // Basic check for suspicious patterns
      return (
        !urlToCheck.includes('<script') && !urlToCheck.includes('javascript:')
      );
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /javascript:/i,
      /vbscript:/i,
      /<script/i,
      /on\w+\s*=/i, // Event handlers like onclick=
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(urlToCheck)) {
        return false;
      }
    }

    // Ensure we have a valid hostname for standard protocols
    if (!parsed.hostname || parsed.hostname.length === 0) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
