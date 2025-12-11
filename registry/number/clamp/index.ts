/**
 * Clamps a number between a minimum and maximum value.
 *
 * Ensures a number stays within specified bounds. If the number is less than
 * the minimum, returns the minimum. If greater than the maximum, returns the
 * maximum. Otherwise returns the original number.
 *
 * @tags pure, math
 * @param value The number to clamp
 * @param min The minimum allowed value
 * @param max The maximum allowed value
 * @returns The clamped number
 *
 * @example
 * ```typescript
 * clamp(10, 0, 5); // 5
 * clamp(-5, 0, 10); // 0
 * clamp(7, 0, 10); // 7
 * clamp(3.7, 1.5, 8.2); // 3.7
 * clamp(15, 10, 20); // 15
 * clamp(25, 10, 20); // 20
 * clamp(5, 10, 20); // 10
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error('Minimum value cannot be greater than maximum value');
  }

  return Math.max(min, Math.min(max, value));
}
