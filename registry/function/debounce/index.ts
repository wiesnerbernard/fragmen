/**
 * Creates a debounced function that delays invoking the provided function until after wait milliseconds have elapsed.
 *
 * Prevents rapid successive calls by canceling previous timeouts. Useful for handling
 * events like search input, button clicks, or window resize where you want to limit
 * the frequency of function execution.
 *
 * @param fn The function to debounce.
 * @param wait The number of milliseconds to delay execution.
 * @returns A debounced version of the function that accepts the same parameters.
 *
 * @example
 * ```typescript
 * const handleSearch = (query: string) => console.log('Searching:', query);
 * const debouncedSearch = debounce(handleSearch, 300);
 *
 * // Multiple rapid calls
 * debouncedSearch('a');
 * debouncedSearch('ap');
 * debouncedSearch('app');
 * // Only the last call ('app') will execute after 300ms
 *
 * const saveData = () => console.log('Saving...');
 * const debouncedSave = debounce(saveData, 1000);
 * ```
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), wait);
  };
}
