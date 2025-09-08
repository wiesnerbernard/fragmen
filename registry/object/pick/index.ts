/**
 * Creates a new object composed of the picked object properties.
 *
 * Extracts only the specified keys from the source object, creating a new object
 * with just those properties. Non-existent keys are silently ignored.
 *
 * @param obj The source object to pick properties from.
 * @param keys Array of property names to pick from the source object.
 * @returns A new object containing only the specified properties.
 *
 * @example
 * ```typescript
 * const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
 * const publicInfo = pick(user, ['id', 'name']);
 * // Result: { id: 1, name: 'John' }
 *
 * const nonExistent = pick(user, ['id', 'role']); // 'role' doesn't exist
 * // Result: { id: 1 }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}
