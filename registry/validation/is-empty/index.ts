/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object).
 *
 * A comprehensive emptiness check that handles multiple JavaScript types.
 * Useful for form validation, data cleaning, and conditional rendering.
 *
 * @tags validation, type-checking
 * @param value The value to check for emptiness
 * @returns True if the value is considered empty, false otherwise
 *
 * @example
 * ```typescript
 * // Primitives
 * isEmpty(null); // true
 * isEmpty(undefined); // true
 * isEmpty(''); // true
 * isEmpty('  '); // true (whitespace-only)
 * isEmpty('hello'); // false
 * isEmpty(0); // false
 * isEmpty(false); // false
 *
 * // Arrays
 * isEmpty([]); // true
 * isEmpty([1, 2, 3]); // false
 *
 * // Objects
 * isEmpty({}); // true
 * isEmpty({ key: 'value' }); // false
 *
 * // Maps and Sets
 * isEmpty(new Map()); // true
 * isEmpty(new Set()); // true
 * isEmpty(new Map([['key', 'value']])); // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  // null or undefined
  if (value === null || value === undefined) {
    return true;
  }

  // String (including whitespace-only strings)
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  // Array
  if (Array.isArray(value)) {
    return value.length === 0;
  }

  // Map or Set
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  // Object
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  // Everything else is considered non-empty (numbers, booleans, etc.)
  return false;
}
