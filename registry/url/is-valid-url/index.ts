export interface IsValidUrlOptions {
  /** Array of allowed protocols (e.g., ['http', 'https']) */
  protocols?: string[];
  /** Whether protocol is required (default: true) */
  requireProtocol?: boolean;
  /** Whether to allow localhost URLs (default: true) */
  allowLocalhost?: boolean;
  /** Whether to allow IP addresses (default: true) */
  allowIp?: boolean;
}

/**
 * Checks if a string is a valid URL.
 *
 * Validates whether a given string represents a valid URL format.
 * Can optionally check for specific protocols or require certain
 * URL components.
 *
 * @param url The string to validate
 * @param options Validation options
 * @returns True if the URL is valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidUrl('https://example.com'); // true
 * isValidUrl('http://localhost:3000'); // true
 * isValidUrl('ftp://files.example.com'); // true
 * isValidUrl('not-a-url'); // false
 * isValidUrl('https://example.com', { protocols: ['https'] }); // true
 * isValidUrl('http://example.com', { protocols: ['https'] }); // false
 * isValidUrl('https://example.com', { requireProtocol: true }); // true
 * ```
 */
export function isValidUrl(
  url: string,
  options: IsValidUrlOptions = {}
): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const {
    protocols,
    requireProtocol = true,
    allowLocalhost = true,
    allowIp = true,
  } = options;

  try {
    let urlToTest = url;

    // If protocol is not required and URL doesn't have one, try adding http://
    if (!requireProtocol && !url.includes('://')) {
      urlToTest = `http://${url}`;
    }

    const parsed = new URL(urlToTest);

    // Check protocol restrictions
    if (protocols && protocols.length > 0) {
      const protocol = parsed.protocol.slice(0, -1); // Remove the trailing ':'
      if (!protocols.includes(protocol)) {
        return false;
      }
    }

    // Check localhost restrictions
    if (
      !allowLocalhost &&
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
    ) {
      return false;
    }

    // Check IP address restrictions
    if (!allowIp && isIpAddress(parsed.hostname)) {
      return false;
    }

    // Additional validation for well-formed URLs
    const protocol = parsed.protocol.slice(0, -1).toLowerCase();

    // Special protocols that don't require hostnames
    const specialProtocols = ['mailto', 'tel', 'sms', 'data', 'javascript'];
    if (specialProtocols.includes(protocol)) {
      return true; // These protocols are valid even without hostnames
    }

    if (!parsed.hostname) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function isIpAddress(hostname: string): boolean {
  // IPv4 pattern
  const ipv4Pattern =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 pattern (simplified)
  // Comprehensive IPv6 pattern (RFC 4291)
  const ipv6Pattern =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9])?[0-9]))$/;

  return ipv4Pattern.test(hostname) || ipv6Pattern.test(hostname);
}
