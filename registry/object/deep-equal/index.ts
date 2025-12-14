/**
 * Performs deep equality comparison between two values
 * @param a First value
 * @param b Second value
 * @returns True if deeply equal, false otherwise
 * @example
 * deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })
 * // true
 *
 * deepEqual([1, 2, 3], [1, 2, 3])
 * // true
 *
 * deepEqual({ a: 1 }, { a: 2 })
 * // false
 *
 * deepEqual(null, null)
 * // true
 *
 * deepEqual(undefined, null)
 * // false
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  // Same reference or both primitive and equal
  if (a === b) {
    return true;
  }

  // Handle null explicitly (typeof null === 'object')
  if (a === null || b === null) {
    return false;
  }
  if (a === undefined || b === undefined) {
    return false;
  }

  // Different types
  if (typeof a !== typeof b) {
    return false;
  }

  // Handle primitives
  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  // Handle dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  // One is array, other is not
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  // Handle objects
  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }
    if (
      !deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    ) {
      return false;
    }
  }

  return true;
}
