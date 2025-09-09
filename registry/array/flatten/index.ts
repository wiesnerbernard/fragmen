/**
 * Flattens nested arrays to a specified depth.
 *
 * Creates a new array with all sub-array elements concatenated into it recursively
 * up to the specified depth. A depth of 1 flattens only the first level of nesting,
 * while Infinity flattens all levels.
 *
 * @param array The array to flatten
 * @param depth The maximum depth to flatten (default: 1)
 * @returns A new flattened array
 *
 * @example
 * ```typescript
 * // Single level flattening (default depth = 1)
 * const nested = [1, [2, 3], [4, [5, 6]]];
 * const flat = flatten(nested);
 * console.log(flat); // [1, 2, 3, 4, [5, 6]]
 *
 * // Deep flattening
 * const deepNested = [1, [2, [3, [4, 5]]]];
 * const deepFlat = flatten(deepNested, Infinity);
 * console.log(deepFlat); // [1, 2, 3, 4, 5]
 *
 * // Specific depth
 * const multiLevel = [1, [2, [3, [4]]]];
 * const twoLevels = flatten(multiLevel, 2);
 * console.log(twoLevels); // [1, 2, 3, [4]]
 *
 * // Mixed data types
 * const mixed = ['a', ['b', 'c'], ['d', ['e']]];
 * const flatMixed = flatten(mixed);
 * console.log(flatMixed); // ['a', 'b', 'c', 'd', ['e']]
 * ```
 */
export function flatten<T>(array: T[], depth = 1): T[] {
  // Handle edge cases
  if (!Array.isArray(array)) {
    return [];
  }

  if (depth <= 0) {
    return [...array];
  }

  const result: T[] = [];

  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatten(item as T[], depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}
