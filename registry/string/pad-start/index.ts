/**
 * Pads the start of a string with another string until it reaches the target length.
 *
 * @param str The string to pad.
 * @param targetLength The desired length of the resulting string.
 * @param padString The string to pad with. Defaults to a space ' '.
 * @returns The padded string.
 * @example
 * padStart('abc', 5, '0')
 * // => '00abc'
 */
export function padStart(
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

  return padString.slice(0, needed) + str;
}
