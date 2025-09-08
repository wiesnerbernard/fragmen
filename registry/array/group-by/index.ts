/**
 * Groups the elements of an array based on the result of a callback function.
 *
 * Creates an object where each key represents a group and the value is an array
 * of items that belong to that group. The grouping is determined by the callback
 * function which is applied to each element.
 *
 * @param array The array of elements to group.
 * @param getKey Function that takes an item and returns the key for grouping.
 * @returns An object where keys are group identifiers and values are arrays of grouped items.
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const grouped = groupBy(numbers, n => n % 2 === 0 ? 'even' : 'odd');
 * // Result: { odd: [1, 3, 5], even: [2, 4, 6] }
 *
 * const users = [
 *   { name: 'Alice', department: 'Engineering' },
 *   { name: 'Bob', department: 'Marketing' },
 *   { name: 'Charlie', department: 'Engineering' }
 * ];
 * const byDepartment = groupBy(users, user => user.department);
 * // Result: { Engineering: [Alice, Charlie], Marketing: [Bob] }
 * ```
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce(
    (acc, item) => {
      const key = getKey(item);

      if (!(key in acc)) {
        acc[key] = [];
      }
      acc[key].push(item);

      return acc;
    },
    {} as Record<K, T[]>
  );
}
