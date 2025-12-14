import { shuffle } from '../shuffle';

/**
 * Returns random element(s) from an array
 * @param array The array to sample from
 * @param count Number of elements to sample (default: 1)
 * @returns Single element if count=1, otherwise array of elements
 * @example
 * sample([1, 2, 3, 4, 5])
 * // 3
 *
 * sample(['red', 'blue', 'green'], 2)
 * // ['blue', 'red']
 *
 * sample([1, 2, 3], 5)
 * // [1, 2, 3] (returns all when count > length)
 */
export function sample<T>(array: readonly T[], count?: 1): T;
export function sample<T>(array: readonly T[], count: number): T[];
export function sample<T>(array: readonly T[], count = 1): T | T[] {
  if (array.length === 0) {
    return count === 1 ? (undefined as T) : [];
  }

  if (count === 1) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(count, array.length));
}
