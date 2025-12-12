/**
 * Creates a deep copy of an object.
 *
 * Recursively clones all properties of an object, including nested objects and arrays.
 * Handles circular references by maintaining a reference map. Primitive values,
 * functions, and built-in objects like Date and RegExp are handled appropriately.
 *
 * @tags pure, object-manipulation
 * @param {T} obj The object to clone
 * @returns {T} A deep copy of the input object
 *
 * @example
 * ```typescript
 * const original = {
 *   name: 'John',
 *   age: 30,
 *   address: {
 *     street: '123 Main St',
 *     city: 'NYC'
 *   },
 *   hobbies: ['reading', 'gaming']
 * };
 *
 * const cloned = clone(original);
 * cloned.address.city = 'LA';
 * console.log(original.address.city); // 'NYC' (unchanged)
 * console.log(cloned.address.city); // 'LA'
 *
 * // Works with arrays
 * const arr = [1, { nested: true }, [2, 3]];
 * const clonedArr = clone(arr);
 * clonedArr[1].nested = false;
 * console.log(arr[1].nested); // true (unchanged)
 *
 * // Handles dates and other built-ins
 * const withDate = { created: new Date(), pattern: /test/g };
 * const clonedDate = clone(withDate);
 * console.log(clonedDate.created instanceof Date); // true
 * ```
 */
export function clone<T>(obj: T): T {
  return cloneWithMap(obj, new WeakMap());
}

/**
 * Internal clone function that maintains a reference map to handle circular references
 */
function cloneWithMap<T>(obj: T, refs: WeakMap<object, unknown>): T {
  // Handle primitive values
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle circular references
  if (refs.has(obj as object)) {
    return refs.get(obj as object) as T;
  }

  // Handle Date objects
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // Handle RegExp objects
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  // Handle Arrays
  if (Array.isArray(obj)) {
    const clonedArray: unknown[] = [];
    refs.set(obj as object, clonedArray);

    for (let i = 0; i < obj.length; i++) {
      clonedArray[i] = cloneWithMap(obj[i], refs);
    }

    return clonedArray as T;
  }

  // Handle Objects
  const clonedObj = {} as Record<string, unknown>;
  refs.set(obj as object, clonedObj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = cloneWithMap(
        (obj as Record<string, unknown>)[key],
        refs
      );
    }
  }

  return clonedObj as T;
}
