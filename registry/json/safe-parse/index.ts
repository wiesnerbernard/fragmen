/**
 * Safely parses a JSON string, returning undefined if parsing fails.
 *
 * Provides error-safe JSON parsing without throwing exceptions. Useful when
 * working with untrusted input or when you want to handle parsing failures
 * gracefully rather than with try-catch blocks.
 *
 * @tags pure, validation
 * @param {string} str The JSON string to parse.
 * @returns {T | undefined} The parsed value with the specified type, or undefined if parsing fails.
 *
 * @example
 * ```typescript
 * const validJson = '{"name": "John", "age": 30}';
 * const result = safeParse<{name: string, age: number}>(validJson);
 * // Result: { name: "John", age: 30 }
 *
 * const invalidJson = '{name: "John"}'; // Missing quotes
 * const failed = safeParse(invalidJson);
 * // Result: undefined
 *
 * const config = safeParse(userInput) ?? { theme: 'light', lang: 'en' };
 * ```
 */
export function safeParse<T = unknown>(str: string): T | undefined {
  try {
    return JSON.parse(str) as T;
  } catch {
    return undefined;
  }
}
