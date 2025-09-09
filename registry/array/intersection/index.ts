/**
 * Finds the intersection of two or more arrays.
 *
 * Returns a new array containing only the elements that are present in all
 * provided arrays. The order of elements in the result follows the order
 * of the first array. Duplicates are removed from the result.
 *
 * @param arrays The arrays to find intersection of
 * @returns A new array containing elements common to all input arrays
 *
 * @example
 * ```typescript
 * const arr1 = [1, 2, 3, 4];
 * const arr2 = [2, 3, 4, 5];
 * const arr3 = [3, 4, 5, 6];
 *
 * const common = intersection(arr1, arr2);
 * console.log(common); // [2, 3, 4]
 *
 * const commonAll = intersection(arr1, arr2, arr3);
 * console.log(commonAll); // [3, 4]
 *
 * // With strings
 * const words1 = ['apple', 'banana', 'cherry'];
 * const words2 = ['banana', 'cherry', 'date'];
 * const commonWords = intersection(words1, words2);
 * console.log(commonWords); // ['banana', 'cherry']
 *
 * // No intersection
 * const noCommon = intersection([1, 2], [3, 4]);
 * console.log(noCommon); // []
 *
 * // With duplicates
 * const dup1 = [1, 1, 2, 3];
 * const dup2 = [1, 2, 2, 4];
 * const uniqueCommon = intersection(dup1, dup2);
 * console.log(uniqueCommon); // [1, 2]
 * ```
 */
export function intersection<T>(...arrays: T[][]): T[] {
  // Handle edge cases
  if (arrays.length === 0) {
    return [];
  }

  // If any input is not an array, return empty (no intersection possible)
  if (arrays.some(arr => !Array.isArray(arr))) {
    return [];
  }

  if (arrays.length === 1) {
    return [...new Set(arrays[0])];
  }

  // Use the first array as the base and check against others
  const [first, ...rest] = arrays;

  // Create sets for all other arrays for efficient lookup
  const otherSets = rest.map(arr => new Set(arr));

  // Filter first array elements that exist in all other arrays
  const result: T[] = [];
  const seen = new Set<T>();

  for (const item of first) {
    if (!seen.has(item) && otherSets.every(set => set.has(item))) {
      result.push(item);
      seen.add(item);
    }
  }

  return result;
}
