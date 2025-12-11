/**
 * Calculates the sum of an array of numbers.
 *
 * Adds all numbers in the array and returns the total. Returns 0 for empty arrays.
 * Handles negative numbers, decimals, and mixed positive/negative values.
 *
 * @param numbers The array of numbers to sum
 * @returns The sum of all numbers in the array, or 0 if array is empty
 *
 * @example
 * ```typescript
 * sum([1, 2, 3, 4, 5]); // 15
 * sum([10, -5, 3]); // 8
 * sum([2.5, 3.7, 1.8]); // 8
 * sum([]); // 0
 * sum([42]); // 42
 * sum([-1, -2, -3]); // -6
 *
 * // Calculate total price
 * const prices = [19.99, 29.99, 9.99];
 * const total = sum(prices); // 59.97
 * ```
 */
export function sum(numbers: number[]): number {
  // Handle edge cases
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }

  // Validate all elements are numbers
  if (numbers.some(n => typeof n !== 'number' || !Number.isFinite(n))) {
    return 0;
  }

  return numbers.reduce((acc, curr) => acc + curr, 0);
}
