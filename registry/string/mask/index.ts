/**
 * Masks a portion of a string with a specified character
 * @param str The string to mask
 * @param options Masking options
 * @returns Masked string
 * @example
 * mask('4532-1234-5678-9010', { start: 4, end: -4 })
 * // '4532************9010'
 *
 * mask('user@example.com', { start: 2, end: -12 })
 * // 'us**@example.com'
 *
 * mask('555-1234', { start: 0, end: 3, char: 'X' })
 * // 'XXX-1234'
 *
 * mask('secret', { start: 1, end: -1 })
 * // 's****t'
 */
export function mask(
  str: string,
  options: {
    start?: number;
    end?: number;
    char?: string;
  } = {}
): string {
  const { start = 0, end = str.length, char = '*' } = options;

  const startIndex = start < 0 ? Math.max(0, str.length + start) : start;
  const endIndex = end < 0 ? Math.max(0, str.length + end) : end;

  // Clamp indices to valid range
  const clampedStart = Math.max(0, Math.min(startIndex, str.length));
  const clampedEnd = Math.max(0, Math.min(endIndex, str.length));

  // Handle start > end case
  if (clampedStart >= clampedEnd) {
    return str;
  }

  const before = str.slice(0, clampedStart);
  const charsToMask = clampedEnd - clampedStart;
  const masked = char.repeat(charsToMask);
  const after = str.slice(clampedEnd);

  return before + masked + after;
}
