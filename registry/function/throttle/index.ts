/**
 * Creates a throttled function that only invokes the provided function at most once per specified time period.
 *
 * Unlike debounce which delays execution, throttle ensures the function is called at regular
 * intervals. The first call is executed immediately, and subsequent calls within the wait period
 * are ignored. Useful for rate-limiting events like scroll, mousemove, or API requests.
 *
 * @tags performance
 * @param fn The function to throttle.
 * @param wait The number of milliseconds to throttle invocations to.
 * @returns A throttled version of the function that accepts the same parameters.
 *
 * @example
 * ```typescript
 * const handleScroll = () => console.log('Scrolling...');
 * const throttledScroll = throttle(handleScroll, 200);
 *
 * // Attach to scroll event
 * window.addEventListener('scroll', throttledScroll);
 * // Will execute immediately, then at most once every 200ms
 *
 * const trackMouse = (x: number, y: number) => console.log(x, y);
 * const throttledTrack = throttle(trackMouse, 100);
 *
 * // Rapid calls
 * throttledTrack(10, 20);  // Executes immediately
 * throttledTrack(15, 25);  // Ignored (within 100ms)
 * // After 100ms
 * throttledTrack(20, 30);  // Executes
 * ```
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastCallTime = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;

    // Clear any pending timeout
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    if (timeSinceLastCall >= wait) {
      // Enough time has passed, execute immediately
      lastCallTime = now;
      fn(...args);
    } else {
      // Schedule execution for the remaining time
      const remainingTime = wait - timeSinceLastCall;
      timeout = setTimeout(() => {
        lastCallTime = Date.now();
        fn(...args);
        timeout = null;
      }, remainingTime);
    }
  };
}
