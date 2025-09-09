/**
 * Deep merges multiple objects into a single object.
 *
 * Combines multiple objects by merging their properties recursively.
 * Later objects in the arguments list will override properties of earlier objects.
 * Arrays are replaced entirely rather than merged element by element.
 *
 * @param objects The objects to merge
 * @returns A new object containing the merged properties
 *
 * @example
 * ```typescript
 * const obj1 = { a: 1, b: { x: 1, y: 2 } };
 * const obj2 = { b: { z: 3 }, c: 4 };
 * const merged = merge(obj1, obj2);
 * console.log(merged); // { a: 1, b: { x: 1, y: 2, z: 3 }, c: 4 }
 *
 * // Multiple objects
 * const base = { name: 'John', age: 30 };
 * const update1 = { age: 31, city: 'NYC' };
 * const update2 = { city: 'LA', country: 'USA' };
 * const result = merge(base, update1, update2);
 * console.log(result); // { name: 'John', age: 31, city: 'LA', country: 'USA' }
 *
 * // Arrays are replaced, not merged
 * const arr1 = { items: [1, 2] };
 * const arr2 = { items: [3, 4] };
 * const arrMerged = merge(arr1, arr2);
 * console.log(arrMerged); // { items: [3, 4] }
 * ```
 */
export function merge(
  ...objects: Array<Record<string, unknown> | null | undefined>
): Record<string, unknown> {
  if (objects.length === 0) {
    return {};
  }

  const result: Record<string, unknown> = {};

  for (const obj of objects) {
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      mergeInto(result, obj);
    }
  }

  return result;
}

/**
 * Helper function to recursively merge one object into another
 */
function mergeInto(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): void {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        // Both values are objects, create a new object and merge recursively
        const newTarget = { ...targetValue };
        mergeInto(
          newTarget as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        );
        target[key] = newTarget;
      } else {
        // Replace the value (includes arrays, primitives, and null)
        // For objects and arrays, we need to create a deep copy to avoid mutation
        if (sourceValue && typeof sourceValue === 'object') {
          target[key] = Array.isArray(sourceValue)
            ? [...sourceValue]
            : { ...sourceValue };
        } else {
          target[key] = sourceValue;
        }
      }
    }
  }
}
