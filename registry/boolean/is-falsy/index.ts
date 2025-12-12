/**
 * Checks if a value is falsy.
 *
 * Returns true for JavaScript falsy values: false, 0, -0, 0n, "", null, undefined, and NaN.
 * Useful for type-safe falsy checks and filtering operations.
 *
 * @tags pure, validation, type-checking
 * @param {unknown} value The value to check for falsiness.
 * @returns {boolean} True if the value is falsy, false otherwise.
 *
 * @example
 * ```typescript
 * isFalsy(false);     // true
 * isFalsy(0);         // true
 * isFalsy('');        // true
 * isFalsy(null);      // true
 * isFalsy(undefined); // true
 * isFalsy('hello');   // false
 * isFalsy(1);         // false
 * isFalsy([]);        // false
 * ```
 */
export function isFalsy(value: unknown): boolean {
  return !value;
}
