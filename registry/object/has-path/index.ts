/**
 * Checks if a nested property path exists in an object.
 *
 * Safely traverses nested object properties using a dot-notation path string
 * or an array of keys. Returns true if the path exists (even if the final value
 * is undefined), false if any part of the path is missing.
 *
 * @tags pure, validation
 * @param obj The object to check
 * @param path The property path as a string (dot notation) or array of keys
 * @returns True if the path exists, false otherwise
 *
 * @example
 * ```typescript
 * const user = {
 *   name: 'John',
 *   address: {
 *     street: '123 Main St',
 *     city: 'NYC',
 *     coordinates: {
 *       lat: 40.7128,
 *       lng: undefined
 *     }
 *   }
 * };
 *
 * hasPath(user, 'name'); // true
 * hasPath(user, 'address.city'); // true
 * hasPath(user, 'address.coordinates.lat'); // true
 * hasPath(user, 'address.coordinates.lng'); // true (exists but undefined)
 * hasPath(user, 'address.zipcode'); // false
 * hasPath(user, 'nonexistent'); // false
 *
 * // Using array notation
 * hasPath(user, ['address', 'coordinates', 'lat']); // true
 * hasPath(user, ['address', 'zipcode']); // false
 *
 * // Works with arrays
 * const data = { items: [{ id: 1 }, { id: 2 }] };
 * hasPath(data, 'items.0.id'); // true
 * hasPath(data, 'items.2.id'); // false
 * ```
 */
export function hasPath(
  obj: Record<string, unknown> | null | undefined,
  path: string | (string | number)[]
): boolean {
  // Handle edge cases
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  // Convert string path to array
  const keys = typeof path === 'string' ? path.split('.') : path;

  if (!Array.isArray(keys) || keys.length === 0) {
    return false;
  }

  let current: unknown = obj;

  for (const key of keys) {
    // Check if current is an object or array
    if (!current || typeof current !== 'object') {
      return false;
    }

    // Check if key exists in current object/array
    if (!(String(key) in current)) {
      return false;
    }

    // Move to next level
    current = (current as Record<string, unknown>)[String(key)];
  }

  return true;
}
