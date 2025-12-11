/**
 * Creates a function that can only be invoked once. Subsequent calls return the result of the first invocation.
 *
 * Ensures a function is executed exactly one time, regardless of how many times it's called.
 * Useful for initialization functions, event handlers that should only fire once, or
 * expensive operations that should only run once.
 *
 * @tags performance
 * @param fn The function to restrict to a single execution.
 * @returns A new function that invokes fn only once and caches the result.
 *
 * @example
 * ```typescript
 * const initialize = () => {
 *   console.log('Initializing...');
 *   return { status: 'initialized' };
 * };
 *
 * const initOnce = once(initialize);
 *
 * const result1 = initOnce(); // Logs: 'Initializing...', returns { status: 'initialized' }
 * const result2 = initOnce(); // Does not log, returns cached result
 * const result3 = initOnce(); // Does not log, returns cached result
 *
 * console.log(result1 === result2); // true - same reference
 *
 * // With parameters
 * const createUser = (name: string) => {
 *   console.log(`Creating user: ${name}`);
 *   return { id: 1, name };
 * };
 *
 * const createUserOnce = once(createUser);
 * createUserOnce('Alice'); // Creates user
 * createUserOnce('Bob');   // Ignores, returns Alice user
 * ```
 */
export function once<T extends (...args: unknown[]) => unknown>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  let called = false;
  let result: ReturnType<T>;

  return (...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = fn(...args) as ReturnType<T>;
    }
    return result;
  };
}
