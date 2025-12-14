/**
 * Randomly shuffles an array using Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 * @example
 * shuffle([1, 2, 3, 4, 5])
 * // [3, 1, 5, 2, 4]
 *
 * shuffle(['a', 'b', 'c'])
 * // ['c', 'a', 'b']
 *
 * shuffle([])
 * // []
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
