/**
 * Creates an array of unique values from all provided arrays.
 *
 * Returns a new array containing all unique elements from all input arrays.
 * The order of elements is determined by the order they first appear across
 * all arrays. Duplicates are removed.
 *
 * @param arrays The arrays to combine
 * @returns A new array of unique values from all arrays
 *
 * @example
 * ```typescript
 * const arr1 = [1, 2, 3];
 * const arr2 = [2, 3, 4];
 * const arr3 = [3, 4, 5];
 *
 * const result = union(arr1, arr2);
 * console.log(result); // [1, 2, 3, 4]
 *
 * const resultAll = union(arr1, arr2, arr3);
 * console.log(resultAll); // [1, 2, 3, 4, 5]
 *
 * // With strings
 * const words1 = ['apple', 'banana'];
 * const words2 = ['banana', 'cherry'];
 * const allWords = union(words1, words2);
 * console.log(allWords); // ['apple', 'banana', 'cherry']
 *
 * // With duplicates
 * const dup1 = [1, 1, 2];
 * const dup2 = [2, 2, 3];
 * const unique = union(dup1, dup2);
 * console.log(unique); // [1, 2, 3]
 *
 * // Single array
 * union([1, 2, 2, 3]); // [1, 2, 3]
 *
 * // No arrays
 * union(); // []
 * ```
 */
export function union<T>(...arrays: T[][]): T[] {
  // Handle edge cases
  if (arrays.length === 0) {
    return [];
  }

  // Filter out non-arrays
  const validArrays = arrays.filter(arr => Array.isArray(arr));

  if (validArrays.length === 0) {
    return [];
  }

  // Use Set to track unique values and maintain insertion order
  const seen = new Set<T>();
  const result: T[] = [];

  for (const array of validArrays) {
    for (const item of array) {
      if (!seen.has(item)) {
        seen.add(item);
        result.push(item);
      }
    }
  }

  return result;
}
