/**
 * Truncates a string if it's longer than the given maximum length.
 * The last characters of the truncated string are replaced with the omission string.
 *
 * @param str The string to truncate.
 * @param options Options for truncation.
 * @param options.length The maximum length of the string, including the omission string.
 * @param options.omission The string to append to the end of the truncated string. Defaults to '...'.
 * @returns The truncated string, or the original string if it's not longer than the specified length.
 * @example
 * truncate('Hello world, this is a long string', { length: 20 })
 * // => 'Hello world, this...'
 */
export function truncate(
  str: string,
  options: { length: number; omission?: string }
): string {
  const { length, omission = '...' } = options;

  if (str.length <= length) {
    return str;
  }

  const truncatedLength = length - omission.length;
  if (truncatedLength < 0) {
    return omission.slice(0, length);
  }

  return str.slice(0, truncatedLength) + omission;
}
