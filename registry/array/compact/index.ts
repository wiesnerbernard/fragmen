/**
 * Removes falsy values from an array.
 *
 * Creates a new array with all falsy values removed. Falsy values are:
 * false, null, 0, "", undefined, and NaN. This is useful for cleaning
 * arrays and ensuring only truthy values remain.
 *
 * @param array The array to remove falsy values from
 * @returns A new array with falsy values removed
 *
 * @example
 * ```typescript
 * const mixed = [0, 1, false, 2, '', 3, null, 4, undefined, 5, NaN];
 * const clean = compact(mixed);
 * console.log(clean); // [1, 2, 3, 4, 5]
 *
 * const strings = ['hello', '', 'world', null, 'foo', undefined];
 * const cleanStrings = compact(strings);
 * console.log(cleanStrings); // ['hello', 'world', 'foo']
 *
 * const booleans = [true, false, true, null, false];
 * const cleanBooleans = compact(booleans);
 * console.log(cleanBooleans); // [true, true]
 *
 * // Empty array
 * compact([]); // []
 *
 * // All falsy values
 * compact([false, null, 0, '', undefined, NaN]); // []
 * ```
 */
export function compact<T>(array: T[]): NonNullable<T>[] {
  // Handle edge cases
  if (!Array.isArray(array)) {
    return [];
  }

  return array.filter((item): item is NonNullable<T> => Boolean(item));
}
