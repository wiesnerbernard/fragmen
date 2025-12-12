/**
 * Wraps a promise with a timeout, rejecting if it doesn't resolve within the specified time.
 *
 * Creates a race between the provided promise and a timeout. If the promise doesn't resolve
 * or reject before the timeout, it will be rejected with a timeout error. Useful for preventing
 * indefinite hangs, enforcing SLAs, or handling slow operations gracefully.
 *
 * @param {Promise<T>} promise The promise to wrap with a timeout
 * @param {number} ms The timeout in milliseconds
 * @param {string} message Optional custom error message (default: "Operation timed out after {ms}ms")
 * @returns {Promise<T>} A promise that resolves with the original promise's value or rejects on timeout
 *
 * @example
 * ```typescript
 * // Fetch with timeout
 * const fetchData = fetch('https://api.example.com/data');
 * const result = await timeout(fetchData, 5000);
 * // Rejects if fetch takes longer than 5 seconds
 *
 * // Custom timeout message
 * const slowOperation = someAsyncFunction();
 * try {
 *   await timeout(slowOperation, 3000, 'API request took too long');
 * } catch (error) {
 *   console.error(error.message); // 'API request took too long'
 * }
 *
 * // With async/await
 * async function loadData() {
 *   try {
 *     const data = await timeout(
 *       fetchDataFromServer(),
 *       10000
 *     );
 *     return data;
 *   } catch (error) {
 *     console.error('Request timed out');
 *     return null;
 *   }
 * }
 * ```
 */
export function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message?: string
): Promise<T> {
  // Validate inputs
  if (!(promise instanceof Promise)) {
    throw new TypeError('First argument must be a Promise');
  }

  if (typeof ms !== 'number' || ms < 0) {
    throw new RangeError('Timeout must be a non-negative number');
  }

  // Create timeout promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      const errorMessage = message ?? `Operation timed out after ${ms}ms`;
      const error = new Error(errorMessage);
      error.name = 'TimeoutError';
      reject(error);
    }, ms);
  });

  // Race between the original promise and timeout
  return Promise.race([promise, timeoutPromise]);
}
