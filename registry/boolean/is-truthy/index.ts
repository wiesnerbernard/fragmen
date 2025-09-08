/**
 * Checks if a value is truthy.
 *
 * Returns true for all JavaScript truthy values (anything that is not falsy).
 * Complementary function to isFalsy, useful for filtering and validation.
 *
 * @param value The value to check for truthiness.
 * @returns True if the value is truthy, false otherwise.
 *
 * @example
 * ```typescript
 * isTruthy('hello');  // true
 * isTruthy(1);        // true
 * isTruthy([]);       // true
 * isTruthy({});       // true
 * isTruthy(false);    // false
 * isTruthy(0);        // false
 * isTruthy('');       // false
 * isTruthy(null);     // false
 * ```
 */
export function isTruthy(value: unknown): boolean {
  return !!value;
}
