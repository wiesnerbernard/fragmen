/**
 * Type-safe localStorage wrapper with automatic JSON serialization.
 *
 * Provides a simple API for storing and retrieving typed values from
 * localStorage with automatic JSON serialization/deserialization. Handles
 * errors gracefully and works in both browser and server environments.
 *
 * @tags storage, type-checking
 * @param {string} key The localStorage key
 * @returns {{ get: (defaultValue: T) => T, set: (value: T) => void, remove: () => void }} An object with get, set, and remove methods
 *
 * @example
 * ```typescript
 * // Define typed storage
 * interface User {
 *   name: string;
 *   age: number;
 * }
 *
 * const userStorage = storage<User>('user');
 *
 * // Set a value
 * userStorage.set({ name: 'Alice', age: 30 });
 *
 * // Get a value with default fallback
 * const user = userStorage.get({ name: 'Guest', age: 0 });
 * console.log(user); // { name: 'Alice', age: 30 }
 *
 * // Remove a value
 * userStorage.remove();
 *
 * // Handle non-existent keys
 * const missing = userStorage.get(null);
 * console.log(missing); // null
 *
 * // Works with primitive types too
 * const countStorage = storage<number>('count');
 * countStorage.set(42);
 * console.log(countStorage.get(0)); // 42
 * ```
 */
export function storage<T>(key: string) {
  const isLocalStorageAvailable = (() => {
    try {
      if (
        typeof window === 'undefined' ||
        typeof window.localStorage === 'undefined'
      ) {
        return false;
      }
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  })();

  return {
    /**
     * Get value from localStorage
     * @param {T} defaultValue Value to return if key doesn't exist or parsing fails
     */
    get(defaultValue: T): T {
      if (!isLocalStorageAvailable) {
        return defaultValue;
      }

      try {
        const item = window.localStorage.getItem(key);
        if (item === null) {
          return defaultValue;
        }
        return JSON.parse(item) as T;
      } catch {
        return defaultValue;
      }
    },

    /**
     * Set value in localStorage
     * @param {T} value Value to store (will be JSON stringified)
     */
    set(value: T): void {
      if (!isLocalStorageAvailable) {
        return;
      }

      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        // Silent fail - storage might be full or unavailable
        console.warn(`Failed to set localStorage key "${key}":`, error);
      }
    },

    /**
     * Remove value from localStorage
     */
    remove(): void {
      if (!isLocalStorageAvailable) {
        return;
      }

      try {
        window.localStorage.removeItem(key);
      } catch {
        // Silent fail
      }
    },
  };
}
