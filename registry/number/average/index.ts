/**
 * Calculates the average (arithmetic mean) of an array of numbers.
 *
 * Sums all numbers in the array and divides by the count. Returns 0 for empty arrays.
 * Handles negative numbers, decimals, and mixed positive/negative values.
 *
 * @param numbers The array of numbers to average
 * @returns The arithmetic mean of the numbers, or 0 if array is empty
 *
 * @example
 * ```typescript
 * average([1, 2, 3, 4, 5]); // 3
 * average([10, 20, 30]); // 20
 * average([2.5, 3.5, 4.5]); // 3.5
 * average([]); // 0
 * average([100]); // 100
 * average([-10, 0, 10]); // 0
 *
 * // Calculate average grade
 * const grades = [85, 92, 78, 95, 88];
 * const avgGrade = average(grades); // 87.6
 *
 * // Calculate average price
 * const prices = [19.99, 24.99, 14.99];
 * const avgPrice = average(prices); // 19.99
 * ```
 */
export function average(numbers: number[]): number {
  // Handle edge cases
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }

  // Validate all elements are numbers
  if (numbers.some(n => typeof n !== 'number' || !Number.isFinite(n))) {
    return 0;
  }

  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
}
