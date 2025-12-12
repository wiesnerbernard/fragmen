/**
 * Creates a memoized version of a function that caches results.
 *
 * Caches function results based on arguments using a simple key-based
 * cache. Improves performance for expensive pure functions by avoiding
 * redundant calculations. Uses JSON.stringify for key generation.
 *
 * @tags performance, pure
 * @param fn The function to memoize (should be pure)
 * @param maxCacheSize Optional maximum cache size (defaults to unlimited)
 * @returns Memoized version of the function with a clear() method
 *
 * @example
 * ```typescript
 * // Expensive calculation
 * const fibonacci = (n: number): number => {
 *   if (n <= 1) return n;
 *   return fibonacci(n - 1) + fibonacci(n - 2);
 * };
 *
 * const memoizedFib = memoize(fibonacci);
 * console.log(memoizedFib(40)); // First call: slow
 * console.log(memoizedFib(40)); // Cached: instant
 *
 * // Multiple arguments
 * const add = (a: number, b: number) => a + b;
 * const memoizedAdd = memoize(add);
 * memoizedAdd(1, 2); // Calculates and caches
 * memoizedAdd(1, 2); // Returns cached result
 *
 * // Limited cache size
 * const memoizedWithLimit = memoize(expensiveFn, 100);
 *
 * // Clear cache manually
 * memoizedAdd.clear();
 * ```
 */
export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  maxCacheSize?: number
): ((...args: TArgs) => TResult) & { clear: () => void } {
  const cache = new Map<string, TResult>();

  const memoized = (...args: TArgs): TResult => {
    // Custom key generation that distinguishes null from undefined
    const key = JSON.stringify(args, (_, value) => {
      if (value === undefined) {
        return '__undefined__';
      }
      return value;
    });

    if (cache.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    // Enforce max cache size (FIFO eviction)
    if (maxCacheSize && cache.size > maxCacheSize) {
      const firstKey = cache.keys().next().value as string;
      if (firstKey) {
        cache.delete(firstKey);
      }
    }

    return result;
  };

  memoized.clear = () => {
    cache.clear();
  };

  return memoized;
}
