/**
 * Reverses the characters of a string.
 *
 * Note: This implementation may not correctly handle surrogate pairs
 * (e.g., complex emojis) as it operates on UTF-16 code units.
 * For true grapheme cluster reversal, a more complex library is needed.
 *
 * @param str The string to reverse.
 * @returns The reversed string.
 * @example
 * reverse('hello')
 * // => 'olleh'
 */
export function reverse(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  return str.split('').reverse().join('');
}
