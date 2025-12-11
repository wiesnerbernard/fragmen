/**
 * Returns a promise that resolves after a given number of milliseconds.
 *
 * Creates an artificial delay using Promise and setTimeout. Useful for implementing
 * timeouts, rate limiting, animation delays, or simulating async operations in testing.
 *
 * @tags async
 * @param ms The number of milliseconds to delay before resolving.
 * @returns A promise that resolves to void after the specified delay.
 *
 * @example
 * ```typescript
 * // Simple delay
 * await delay(1000); // Wait 1 second
 * console.log('This runs after 1 second');
 *
 * // In async function
 * async function fetchWithDelay() {
 *   console.log('Starting...');
 *   await delay(500);
 *   console.log('Fetching data...');
 *   return fetch('/api/data');
 * }
 *
 * // Rate limiting
 * for (const item of items) {
 *   await processItem(item);
 *   await delay(100); // 100ms between each item
 * }
 * ```
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
