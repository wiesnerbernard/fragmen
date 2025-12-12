/**
 * Retries a promise-returning function a specified number of times with exponential backoff.
 *
 * Attempts to execute the function, and if it fails, retries up to the specified number of times.
 * Each retry waits longer than the previous one (exponential backoff). Useful for handling
 * flaky network requests, rate-limited APIs, or temporary failures.
 *
 * @param {() => Promise<T>} fn The async function to retry
 * @param {object} options Configuration for retry behavior
 * @param {number} options.retries Maximum number of retry attempts (default: 3)
 * @param {number} options.delay Initial delay in milliseconds between retries (default: 1000)
 * @param {number} options.backoff Multiplier for exponential backoff (default: 2)
 * @returns {Promise<T>} A promise that resolves with the function's result or rejects after all retries fail
 *
 * @example
 * ```typescript
 * // Retry a fetch request
 * const fetchData = () => fetch('https://api.example.com/data');
 * const result = await retry(fetchData, { retries: 3 });
 *
 * // Custom retry configuration
 * const unstableOperation = async () => {
 *   const response = await fetch('/api/unstable');
 *   if (!response.ok) throw new Error('Failed');
 *   return response.json();
 * };
 *
 * const data = await retry(unstableOperation, {
 *   retries: 5,
 *   delay: 500,
 *   backoff: 2
 * });
 * // Retries: 500ms, 1000ms, 2000ms, 4000ms, 8000ms
 *
 * // With single retry
 * const quickRetry = await retry(fetchData, { retries: 1, delay: 100 });
 * ```
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    backoff?: number;
  } = {}
): Promise<T> {
  const { retries = 3, delay: initialDelay = 1000, backoff = 2 } = options;

  // Validate inputs
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function');
  }

  if (retries < 0 || !Number.isInteger(retries)) {
    throw new RangeError('retries must be a non-negative integer');
  }

  if (initialDelay < 0) {
    throw new RangeError('delay must be non-negative');
  }

  if (backoff <= 0) {
    throw new RangeError('backoff must be positive');
  }

  let lastError: unknown;
  let currentDelay = initialDelay;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // If this was the last attempt, throw the error
      if (attempt === retries) {
        throw error;
      }

      // Wait before next retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, currentDelay));
      currentDelay *= backoff;
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError;
}
