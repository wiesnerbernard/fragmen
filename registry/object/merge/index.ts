/**
 * Checks if a value is a non-array, non-null object.
 *
 * @param {unknown} item The value to check.
 * @returns {boolean} True if the value is a plain object.
 */
function _isObject(item: unknown): item is Record<string, unknown> {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Creates a deep copy of an object or array.
 *
 * @param {T} source The object or array to copy.
 * @returns {T} A deep copy of the source.
 */
function _deepCopy<T>(source: T): T {
  if (!_isObject(source) && !Array.isArray(source)) {
    return source;
  }

  if (Array.isArray(source)) {
    return source.map(item => _deepCopy(item)) as unknown as T;
  }

  const newObject = {} as Record<keyof T, unknown>;
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      newObject[key as keyof T] = _deepCopy(source[key]);
    }
  }
  return newObject as T;
}

/**
 * Deep merges multiple objects into a new object.
 *
 * Combines objects by merging their properties recursively.
 * Later objects in the arguments list override properties of earlier objects.
 * Arrays are replaced entirely rather than merged.
 *
 * @tags pure, object-manipulation
 * @template T - An array of object types.
 * @param {...T} objects The objects to merge.
 * @returns {UnionToIntersection<T[number]>} A new object containing the merged properties, with preserved types.
 */
export function merge<T extends object[]>(
  ...objects: T
): UnionToIntersection<T[number]> {
  const result = {} as Record<string, unknown>;

  for (const source of objects) {
    if (!_isObject(source)) {
      continue;
    }

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key as keyof typeof source];
        const targetValue = result[key];

        if (_isObject(sourceValue) && _isObject(targetValue)) {
          // Recursively merge if both are objects
          result[key] = merge(targetValue, sourceValue);
        } else {
          // Otherwise, overwrite (with a deep copy to prevent mutation)
          result[key] = _deepCopy(sourceValue);
        }
      }
    }
  }

  return result as UnionToIntersection<T[number]>;
}

// Helper type to convert a union of objects into an intersection of objects
// Update unknown to your preference
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
