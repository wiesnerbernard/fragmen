/**
 * Pads the end of a string with another string until it reaches the target length.
 *
 * @tags pure, string-manipulation, formatting
 * @param {string} str The string to pad.
 * @param {number} targetLength The desired length of the resulting string.
 * @param {string} padString The string to pad with. Defaults to a space ' '.
 *   If padString is '', the original string is returned (mirrors native behavior).
 * @returns {string} The padded string. Returns '' for non-string input.
 * @example
 * padEnd('abc', 5, '0')
 * // => 'abc00'
 */
export function padEnd(
  str: string,
  targetLength: number,
  padString = ' '
): string {
  if (typeof str !== 'string') {
    return '';
  }
  const needed = targetLength - str.length;
  if (needed <= 0) {
    return str;
  }

  if (padString === '') {
    return str;
  }

  if (padString.length < needed) {
    const repeatCount = Math.ceil(needed / padString.length);
    padString = padString.repeat(repeatCount);
  }

  return str + padString.slice(0, needed);
}
