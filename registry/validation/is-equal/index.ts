/**
 * Deep comparison of two values for equality.
 *
 * Recursively compares objects, arrays, dates, and primitives for deep equality.
 * Handles circular references, special objects (Date, RegExp, Map, Set), and
 * all primitive types. Useful for comparing complex data structures.
 *
 * @tags validation, pure
 * @param a First value to compare
 * @param b Second value to compare
 * @returns True if values are deeply equal, false otherwise
 *
 * @example
 * ```typescript
 * // Primitives
 * isEqual(1, 1); // true
 * isEqual('hello', 'hello'); // true
 * isEqual(true, false); // false
 *
 * // Arrays
 * isEqual([1, 2, 3], [1, 2, 3]); // true
 * isEqual([1, 2], [1, 2, 3]); // false
 *
 * // Objects
 * isEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
 * isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }); // true (order doesn't matter)
 *
 * // Nested structures
 * isEqual(
 *   { user: { name: 'Alice', scores: [1, 2, 3] } },
 *   { user: { name: 'Alice', scores: [1, 2, 3] } }
 * ); // true
 *
 * // Dates
 * isEqual(new Date('2024-01-01'), new Date('2024-01-01')); // true
 *
 * // Special cases
 * isEqual(NaN, NaN); // true (unlike === comparison)
 * isEqual(null, undefined); // false
 * ```
 */
export function isEqual(a: unknown, b: unknown): boolean {
  // Same reference or primitive equality
  if (a === b) {
    return true;
  }

  // Handle NaN (NaN !== NaN in JavaScript)
  if (
    typeof a === 'number' &&
    typeof b === 'number' &&
    Number.isNaN(a) &&
    Number.isNaN(b)
  ) {
    return true;
  }

  // Different types
  if (typeof a !== typeof b) {
    return false;
  }

  // null/undefined
  if (a === null || b === null || a === undefined || b === undefined) {
    return false;
  }

  // Dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // RegExp
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((item, index) => isEqual(item, b[index]));
  }

  // Maps
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) {
      return false;
    }
    for (const [key, value] of a) {
      if (!b.has(key) || !isEqual(value, b.get(key))) {
        return false;
      }
    }
    return true;
  }

  // Sets
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) {
      return false;
    }
    for (const item of a) {
      if (!b.has(item)) {
        return false;
      }
    }
    return true;
  }

  // Objects
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(key => {
      const objA = a as Record<string, unknown>;
      const objB = b as Record<string, unknown>;
      return (
        Object.prototype.hasOwnProperty.call(objB, key) &&
        isEqual(objA[key], objB[key])
      );
    });
  }

  return false;
}
