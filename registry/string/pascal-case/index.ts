/**
 * Converts a string to PascalCase.
 *
 * Transforms a string by removing spaces, underscores, and hyphens, then capitalizing
 * the first letter of each word including the first one. Commonly used for class names,
 * interface names, type names, and component names.
 *
 * @tags pure, string-manipulation, formatting
 * @param {string} str The string to convert
 * @returns {string} The PascalCase version of the string
 *
 * @example
 * ```typescript
 * pascalCase('Hello World'); // 'HelloWorld'
 * pascalCase('first_name'); // 'FirstName'
 * pascalCase('kebab-case-string'); // 'KebabCaseString'
 * pascalCase('camelCase'); // 'CamelCase'
 * pascalCase('  multiple   spaces  '); // 'MultipleSpaces'
 * pascalCase('AlreadyPascalCase'); // 'AlreadyPascalCase'
 * pascalCase(''); // ''
 * ```
 */
export function pascalCase(str: string): string {
  if (typeof str !== 'string') {
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
      .map(word => {
        const lowerWord = word.toLowerCase();
        // Capitalize first letter of every word
        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
      })
      .join('')
  );
}
