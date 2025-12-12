/**
 * Sorts an array of objects by a property or using a custom function.
 *
 * Creates a new sorted array without mutating the original. Can sort by a property name
 * (for objects) or by using a custom iteratee function. Supports ascending and descending order.
 *
 * @tags pure, array-manipulation
 * @param {T[]} array The array to sort
 * @param {keyof T | ((item: T) => any)} iteratee Property name or function to determine sort order
 * @param {'asc' | 'desc'} order Sort order: 'asc' for ascending (default), 'desc' for descending
 * @returns {T[]} A new sorted array
 *
 * @example
 * ```typescript
 * // Sort by property
 * const users = [
 *   { name: 'Charlie', age: 30 },
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 35 }
 * ];
 *
 * const byName = sortBy(users, 'name');
 * console.log(byName);
 * // [{ name: 'Alice', ... }, { name: 'Bob', ... }, { name: 'Charlie', ... }]
 *
 * const byAge = sortBy(users, 'age', 'desc');
 * console.log(byAge);
 * // [{ age: 35, ... }, { age: 30, ... }, { age: 25, ... }]
 *
 * // Sort using function
 * const numbers = [3, 1, 4, 1, 5];
 * const sorted = sortBy(numbers, n => n);
 * console.log(sorted); // [1, 1, 3, 4, 5]
 *
 * // Sort by computed value
 * const words = ['apple', 'pie', 'zoo', 'be'];
 * const byLength = sortBy(words, w => w.length);
 * console.log(byLength); // ['be', 'pie', 'zoo', 'apple']
 * ```
 */
export function sortBy<T>(
  array: T[],
  iteratee: ((item: T) => unknown) | keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  // Handle edge cases
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  // Create a copy to avoid mutation
  const result = [...array];

  // Determine how to extract the sort value
  const getValue =
    typeof iteratee === 'function'
      ? iteratee
      : (item: T) => {
          if (item !== null && item !== undefined && typeof item === 'object') {
            return (item as Record<string | number | symbol, unknown>)[
              iteratee
            ];
          }
          return item;
        };

  // Sort the array
  result.sort((a, b) => {
    const aValue = getValue(a);
    const bValue = getValue(b);

    // Handle null/undefined
    if (aValue === null || aValue === undefined) {
      if (bValue === null || bValue === undefined) {
        return 0;
      }
      return order === 'asc' ? 1 : -1;
    }
    if (bValue === null || bValue === undefined) {
      return order === 'asc' ? -1 : 1;
    }

    // Compare values
    let comparison = 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else {
      // Fallback to string comparison
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return result;
}
