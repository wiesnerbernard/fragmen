/**
 * Splits an array into chunks of a specified size.
 *
 * Creates a new array containing subarrays (chunks) of the original array,
 * each with a maximum length of the specified size. The last chunk may contain
 * fewer elements if the array length is not evenly divisible by the chunk size.
 *
 * @tags pure, array-manipulation
 * @param {T[]} array The array to split into chunks
 * @param {number} size The maximum size of each chunk (must be positive integer)
 * @returns {T[][]} A new array containing the chunks, or empty array if input is invalid
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5, 6, 7];
 * const chunks = chunk(numbers, 3);
 * console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7]]
 *
 * const letters = ['a', 'b', 'c', 'd', 'e'];
 * const pairs = chunk(letters, 2);
 * console.log(pairs); // [['a', 'b'], ['c', 'd'], ['e']]
 *
 * // Edge cases
 * chunk([], 2); // []
 * chunk([1, 2, 3], 0); // []
 * chunk([1, 2, 3], -1); // []
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
  // Handle edge cases
  if (
    !Array.isArray(array) ||
    array.length === 0 ||
    !Number.isInteger(size) ||
    size <= 0
  ) {
    return [];
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}
