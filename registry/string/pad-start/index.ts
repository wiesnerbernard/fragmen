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
  if (str.length >= targetLength) {
    return str;
  }

  targetLength = targetLength - str.length;
  if (targetLength > padString.length) {
    padString += padString.repeat(targetLength / padString.length);
  }

  return padString.slice(0, targetLength) + str;
}
