/**
 * Capitalizes the first letter of a string.
 * 
 * @param str The string to capitalize.
 * @returns The capitalized string.
 * 
 * @example capitalize('hello world') // 'Hello world'
 */
export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
