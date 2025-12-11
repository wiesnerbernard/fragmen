/**
 * Creates an array of values from the first array that are not present in the other arrays.
 *
 * Returns a new array containing elements that exist in the first array but not in any
 * of the subsequent arrays. The order of elements follows the order of the first array.
 * Duplicates in the first array are preserved unless they appear in other arrays.
 *
 * @param array The array to inspect
 * @param values Arrays of values to exclude
 * @returns A new array of filtered values
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5];
 * const toExclude = [2, 4];
 *
 * const result = difference(numbers, toExclude);
 * console.log(result); // [1, 3, 5]
 *
 * // Multiple exclusion arrays
 * const arr = [1, 2, 3, 4, 5, 6];
 * const result2 = difference(arr, [2, 3], [4, 5]);
 * console.log(result2); // [1, 6]
 *
 * // With strings
 * const words = ['apple', 'banana', 'cherry', 'date'];
 * const exclude = ['banana', 'date'];
 * const filtered = difference(words, exclude);
 * console.log(filtered); // ['apple', 'cherry']
 *
 * // No exclusions
 * difference([1, 2, 3], []); // [1, 2, 3]
 *
 * // All excluded
 * difference([1, 2, 3], [1, 2, 3]); // []
 * ```
 */
export function difference<T>(array: T[], ...values: T[][]): T[] {
  // Handle edge cases
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  // If no exclusion arrays provided, return copy of original
  if (values.length === 0) {
    return [...array];
  }

  // Filter out any non-array values
  const validExclusions = values.filter(arr => Array.isArray(arr));

  if (validExclusions.length === 0) {
    return [...array];
  }

  // Create a Set of all values to exclude for O(1) lookup
  const excludeSet = new Set<T>();
  for (const exclusionArray of validExclusions) {
    for (const value of exclusionArray) {
      excludeSet.add(value);
    }
  }

  // Filter array keeping only values not in exclude set
  return array.filter(item => !excludeSet.has(item));
}
