/**
 * Returns a new array with only unique elements from the input array.
 *
 * Uses Set to efficiently remove duplicates while preserving the order of first
 * occurrence. Works with primitive types and object references.
 *
 * @tags pure, array-manipulation
 * @param {T[]} array The array to filter for unique elements.
 * @returns {T[]} A new array containing only unique elements in order of first appearance.
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 2, 3, 1, 4];
 * const uniqueNumbers = unique(numbers);
 * // Result: [1, 2, 3, 4]
 *
 * const strings = ['apple', 'banana', 'apple', 'cherry'];
 * const uniqueStrings = unique(strings);
 * // Result: ['apple', 'banana', 'cherry']
 * ```
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
