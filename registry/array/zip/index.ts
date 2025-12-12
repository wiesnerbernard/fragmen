/**
 * Creates an array of grouped elements, where the first array contains the first elements
 * of the given arrays, the second array contains the second elements, and so on.
 *
 * The returned array is truncated to the length of the shortest input array.
 * This is useful for combining parallel arrays into tuples.
 *
 * @tags pure, array-manipulation
 * @param {...Array<any>[]} arrays The arrays to zip together
 * @returns {Array<any>[]} A new array of grouped elements
 *
 * @example
 * ```typescript
 * const names = ['Alice', 'Bob', 'Charlie'];
 * const ages = [25, 30, 35];
 * const cities = ['NYC', 'LA', 'Chicago'];
 *
 * const result = zip(names, ages);
 * console.log(result); // [['Alice', 25], ['Bob', 30], ['Charlie', 35]]
 *
 * const resultAll = zip(names, ages, cities);
 * console.log(resultAll);
 * // [['Alice', 25, 'NYC'], ['Bob', 30, 'LA'], ['Charlie', 35, 'Chicago']]
 *
 * // Different lengths (truncated to shortest)
 * const arr1 = [1, 2, 3, 4];
 * const arr2 = ['a', 'b'];
 * const truncated = zip(arr1, arr2);
 * console.log(truncated); // [[1, 'a'], [2, 'b']]
 *
 * // Single array
 * zip([1, 2, 3]); // [[1], [2], [3]]
 *
 * // Empty array
 * zip([], [1, 2]); // []
 * ```
 */
export function zip(...arrays: unknown[][]): unknown[][] {
  // Handle edge cases
  if (arrays.length === 0) {
    return [];
  }

  // Filter out non-arrays
  const validArrays = arrays.filter(arr => Array.isArray(arr));

  if (validArrays.length === 0) {
    return [];
  }

  // If any array is empty, result is empty
  if (validArrays.some(arr => arr.length === 0)) {
    return [];
  }

  // Find the length of the shortest array
  const minLength = Math.min(...validArrays.map(arr => arr.length));

  // Build result array
  const result: unknown[][] = [];

  for (let i = 0; i < minLength; i++) {
    const group: unknown[] = [];
    for (const array of validArrays) {
      group.push(array[i]);
    }
    result.push(group);
  }

  return result;
}
