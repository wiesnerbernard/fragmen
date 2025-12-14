/**
 * Type-safe Promise.allSettled with separated results
 * @param promises Array of promises
 * @returns Object with fulfilled and rejected arrays
 * @example
 * const { fulfilled, rejected } = await allSettledTyped([
 *   Promise.resolve(1),
 *   Promise.resolve(2),
 *   Promise.reject(new Error('failed'))
 * ]);
 * // fulfilled: [1, 2]
 * // rejected: [Error('failed')]
 *
 * const { fulfilled, rejected } = await allSettledTyped([
 *   fetch('/api/user'),
 *   fetch('/api/posts'),
 *   fetch('/api/comments')
 * ]);
 * console.log(`${fulfilled.length} succeeded, ${rejected.length} failed`);
 */
export async function allSettledTyped<T>(promises: Promise<T>[]): Promise<{
  fulfilled: T[];
  rejected: Error[];
}> {
  const results = await Promise.allSettled(promises);

  const fulfilled: T[] = [];
  const rejected: Error[] = [];

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      fulfilled.push(result.value);
    } else {
      rejected.push(result.reason);
    }
  });

  return { fulfilled, rejected };
}
