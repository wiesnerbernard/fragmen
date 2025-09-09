/**
 * Rounds a number to a specified number of decimal places.
 *
 * Provides more control over rounding than the built-in Math.round(),
 * allowing you to specify the number of decimal places to round to.
 * Uses standard mathematical rounding (round half up).
 *
 * @param value The number to round
 * @param precision The number of decimal places (default: 0)
 * @returns The rounded number
 *
 * @example
 * ```typescript
 * round(3.14159); // 3
 * round(3.14159, 2); // 3.14
 * round(3.14159, 4); // 3.1416
 * round(123.456, 1); // 123.5
 * round(123.456, -1); // 120 (round to nearest 10)
 * round(123.456, -2); // 100 (round to nearest 100)
 * round(2.5); // 3
 * round(-2.5); // -2
 * ```
 */
export function round(value: number, precision = 0): number {
  if (!Number.isFinite(value)) {
    return value;
  }

  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}
