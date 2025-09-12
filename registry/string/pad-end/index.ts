/**
 * Pads the end of a string with another string until it reaches the target length.
 *
 * @param str The string to pad.
 * @param targetLength The desired length of the resulting string.
 * @param padString The string to pad with. Defaults to a space ' '.
 * @returns The padded string.
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
  if (str.length >= targetLength) {
    return str;
  }

  targetLength = targetLength - str.length;
  if (targetLength > padString.length) {
    padString += padString.repeat(targetLength / padString.length);
  }

  return str + padString.slice(0, targetLength);
}
