/**
 * Creates a new object by omitting specified keys from the source object.
 *
 * Returns a new object that contains all properties from the source object
 * except for the specified keys. This is the opposite of the pick utility.
 * The operation is shallow - nested objects are not deeply omitted.
 *
 * @param obj The source object to omit properties from
 * @param keys Array of keys to omit from the object
 * @returns A new object without the specified keys
 *
 * @example
 * ```typescript
 * const user = {
 *   id: 1,
 *   name: 'John',
 *   email: 'john@example.com',
 *   password: 'secret123',
 *   age: 30
 * };
 *
 * const publicUser = omit(user, ['password', 'email']);
 * console.log(publicUser); // { id: 1, name: 'John', age: 30 }
 *
 * const minimal = omit(user, ['password', 'email', 'age']);
 * console.log(minimal); // { id: 1, name: 'John' }
 *
 * // Omitting non-existent keys is safe
 * const safe = omit(user, ['nonexistent', 'password']);
 * console.log(safe); // { id: 1, name: 'John', email: 'john@example.com', age: 30 }
 * ```
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T | null | undefined,
  keys: K[]
): Omit<T, K> {
  // Handle edge cases
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return {} as Omit<T, K>;
  }

  if (!Array.isArray(keys) || keys.length === 0) {
    return { ...obj } as Omit<T, K>;
  }

  const keysToOmit = new Set(keys);
  const result = {} as Omit<T, K>;

  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      !keysToOmit.has(key as unknown as K)
    ) {
      (result as Record<string, unknown>)[key] = obj[key];
    }
  }

  return result;
}
