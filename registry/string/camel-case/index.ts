/**
 * Converts a string to camelCase.
 *
 * Transforms a string by removing spaces, underscores, and hyphens, then capitalizing
 * the first letter of each word except the first one. Commonly used for JavaScript
 * variable names, object properties, and function names.
 *
 * @param str The string to convert
 * @returns The camelCase version of the string
 *
 * @example
 * ```typescript
 * camelCase('Hello World'); // 'helloWorld'
 * camelCase('first_name'); // 'firstName'
 * camelCase('kebab-case-string'); // 'kebabCaseString'
 * camelCase('PascalCase'); // 'pascalCase'
 * camelCase('  multiple   spaces  '); // 'multipleSpaces'
 * camelCase('alreadyCamelCase'); // 'alreadyCamelCase'
 * camelCase(''); // ''
 * ```
 */
export function camelCase(str: string): string {
  if (!str) {
    return '';
  }

  return (
    str
      .trim()
      // Split on spaces, underscores, hyphens, and camelCase boundaries
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // XMLHttp -> XML Http
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before uppercase in camelCase
      .replace(/([0-9])([A-Z])/g, '$1 $2') // version2Update -> version2 Update
      .split(/[\s_-]+/)
      .filter(word => word.length > 0)
      .map((word, index) => {
        const lowerWord = word.toLowerCase();
        // First word stays lowercase, subsequent words get capitalized
        return index === 0
          ? lowerWord
          : lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
      })
      .join('')
  );
}
