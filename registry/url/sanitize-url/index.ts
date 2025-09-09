export interface SanitizeUrlOptions {
  /** Default protocol to use for protocol-relative URLs */
  defaultProtocol?: string;
  /** Allowed protocols (default: ['http', 'https', 'ftp', 'mailto', 'tel', 'sms']) */
  allowedProtocols?: string[];
  /** Whether to remove query parameters (default: false) */
  removeQuery?: boolean;
  /** Whether to remove hash fragments (default: false) */
  removeHash?: boolean;
  /** Whether to allow data URLs (default: false) */
  allowDataUrls?: boolean;
  /** Whether to allow blob URLs (default: false) */
  allowBlobUrls?: boolean;
  /** Maximum URL length (default: 2048) */
  maxLength?: number;
  /** Custom validation function */
  customValidator?: (url: string) => boolean;
}

/**
 * Sanitizes a URL by removing or encoding potentially dangerous elements.
 *
 * Cleans URLs to prevent XSS attacks and other security issues by removing
 * dangerous protocols, encoding special characters, and validating the URL
 * structure. Returns null if the URL cannot be safely sanitized.
 * Enhanced with additional security options and custom validation.
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
 *
 * sanitizeUrl('data:text/plain;base64,SGVsbG8=', { allowDataUrls: true });
 * // 'data:text/plain;base64,SGVsbG8='
 *
 * sanitizeUrl('https://example.com', { maxLength: 10 }); // null
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
    allowDataUrls = false,
    allowBlobUrls = false,
    maxLength = 2048,
    customValidator,
  } = options;

  // Build final allowed protocols list
  const finalAllowedProtocols = [...allowedProtocols];
  if (allowDataUrls && !finalAllowedProtocols.includes('data')) {
    finalAllowedProtocols.push('data');
  }
  if (allowBlobUrls && !finalAllowedProtocols.includes('blob')) {
    finalAllowedProtocols.push('blob');
  }

  // Check URL length
  if (url.length > maxLength) {
    return null;
  }

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
        if (
          ['mailto', 'tel', 'sms', 'data', 'blob'].includes(possibleProtocol)
        ) {
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

    // Handle data URLs
    if (protocol === 'data' && !allowDataUrls) {
      return null;
    }

    // Handle blob URLs
    if (protocol === 'blob' && !allowBlobUrls) {
      return null;
    }

    if (!finalAllowedProtocols.includes(protocol)) {
      return null;
    }

    // Reconstruct the URL to ensure proper encoding
    let sanitized: string;

    // Handle special protocols that don't follow standard URL structure
    if (['mailto', 'tel', 'sms'].includes(protocol)) {
      // Encode everything after the protocol to prevent XSS attacks
      // e.g. mailto:someone@example.com?subject=Hi
      const colonIndex = cleanUrl.indexOf(':');
      if (colonIndex !== -1) {
        const proto = cleanUrl.slice(0, colonIndex + 1); // e.g. 'mailto:'
        const rest = cleanUrl.slice(colonIndex + 1);
        // For mailto, tel, sms, encode the address/number part, but preserve query/hash
        const [addressPart, separator, queryHash] = rest.split(/([?#])(.*)/, 3);
        const encoded = encodeURIComponent(addressPart || '');
        // separator may be '?' or '#', queryHash may be undefined or empty
        sanitized = proto + encoded + (separator || '') + (queryHash || '');
      } else {
        sanitized = cleanUrl;
      }
    } else if (protocol === 'data') {
      // For data URLs, return as-is if allowed
      sanitized = cleanUrl;
    } else if (protocol === 'blob') {
      // For blob URLs, return as-is if allowed
      sanitized = cleanUrl;
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
    if (!isValidSanitizedUrl(sanitized, allowDataUrls, allowBlobUrls)) {
      return null;
    }

    // Custom validation
    if (customValidator && !customValidator(sanitized)) {
      return null;
    }

    return sanitized;
  } catch {
    return null;
  }
}

function isValidSanitizedUrl(
  url: string,
  allowDataUrls = false,
  allowBlobUrls = false
): boolean {
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

    // Handle data URLs
    if (protocol === 'data') {
      if (!allowDataUrls) {
        return false;
      }
      // For data URLs, check for suspicious patterns
      return (
        !urlToCheck.includes('<script') && !urlToCheck.includes('javascript:')
      );
    }

    // Handle blob URLs
    if (protocol === 'blob') {
      return allowBlobUrls;
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
    // Data URLs don't have hostnames, so skip this check for them
    if (
      protocol !== 'data' &&
      (!parsed.hostname || parsed.hostname.length === 0)
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
