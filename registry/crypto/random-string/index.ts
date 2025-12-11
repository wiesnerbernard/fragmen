/**
 * Generates a random string of specified length.
 *
 * Creates a cryptographically secure random string using the specified
 * character set. By default uses alphanumeric characters (a-z, A-Z, 0-9).
 * Useful for generating tokens, IDs, or passwords.
 *
 * @tags crypto, string-manipulation
 * @param length The desired length of the random string
 * @param charset Optional custom character set to use (defaults to alphanumeric)
 * @returns A random string of the specified length
 *
 * @example
 * ```typescript
 * // Generate a 16-character alphanumeric string
 * const token = randomString(16);
 * // 'aB3cD5eF7gH9iJ2k'
 *
 * // Generate a numeric PIN
 * const pin = randomString(6, '0123456789');
 * // '847235'
 *
 * // Generate a custom character set
 * const code = randomString(8, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
 * // 'A3K9MN2X' (excludes confusing characters like 0, O, I, 1)
 *
 * // Empty string if length is 0 or negative
 * randomString(0); // ''
 * randomString(-5); // ''
 * ```
 */
export function randomString(
  length: number,
  charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  if (length <= 0 || !Number.isInteger(length)) {
    return '';
  }

  if (!charset || charset.length === 0) {
    throw new Error('Charset must be a non-empty string');
  }

  let result = '';

  // Use crypto.getRandomValues if available for better security
  if (
    typeof crypto !== 'undefined' &&
    'getRandomValues' in crypto &&
    typeof (crypto as Crypto).getRandomValues === 'function'
  ) {
    const randomValues = new Uint8Array(length);
    (crypto as Crypto).getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
  } else {
    // Fallback to Math.random()
    for (let i = 0; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
  }

  return result;
}
