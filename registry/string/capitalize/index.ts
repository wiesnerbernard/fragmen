/**
 * Capitalizes the first letter of a string.
 *
 * Converts the first character to uppercase while leaving the rest unchanged.
 * Safely handles edge cases like empty strings and non-string inputs.
 *
 * @tags pure, string-manipulation, formatting
 * @param str The string to capitalize.
 * @returns The string with the first letter capitalized, or empty string if invalid input.
 *
 * @example
 * ```typescript
 * capitalize('hello world');  // 'Hello world'
 * capitalize('javaScript');   // 'JavaScript'
 * capitalize('HTML');         // 'HTML'
 * capitalize('');             // ''
 * capitalize('a');            // 'A'
 * ```
 */
export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
