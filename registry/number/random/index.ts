/**
 * Generates a random number between min and max (inclusive of min, exclusive of max).
 *
 * Provides a more convenient interface for generating random numbers within
 * a specific range compared to Math.random(). Supports both integer and
 * floating-point ranges.
 *
 * @tags math
 * @param min The minimum value (inclusive)
 * @param max The maximum value (exclusive)
 * @param integer Whether to return an integer (default: false)
 * @returns A random number within the specified range
 *
 * @example
 * ```typescript
 * // Random float between 0 and 1
 * random(0, 1); // e.g., 0.7234
 *
 * // Random float between 5 and 10
 * random(5, 10); // e.g., 7.832
 *
 * // Random integer between 1 and 6 (dice roll)
 * random(1, 7, true); // e.g., 4
 *
 * // Random integer between 0 and 100
 * random(0, 101, true); // e.g., 42
 *
 * // Random negative number
 * random(-10, 10); // e.g., -3.456
 * ```
 */
export function random(min: number, max: number, integer = false): number {
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  }

  if (min === max) {
    return min;
  }

  const randomValue = Math.random() * (max - min) + min;

  return integer ? Math.floor(randomValue) : randomValue;
}
