/**
 * Converts a string to snake_case.
 *
 * Transforms a string by converting it to lowercase and replacing spaces, hyphens,
 * and camelCase boundaries with underscores. Commonly used for database column names,
 * Python variables, and configuration keys.
 *
 * @param str The string to convert
 * @returns The snake_case version of the string
 *
 * @example
 * ```typescript
 * snakeCase('Hello World'); // 'hello_world'
 * snakeCase('firstName'); // 'first_name'
 * snakeCase('XMLHttpRequest'); // 'xml_http_request'
 * snakeCase('kebab-case-string'); // 'kebab_case_string'
 * snakeCase('  multiple   spaces  '); // 'multiple_spaces'
 * snakeCase('already_snake_case'); // 'already_snake_case'
 * snakeCase(''); // ''
 * ```
 */
export function snakeCase(str: string): string {
  if (!str) {
    return '';
  }

  return (
    str
      .trim()
      // Handle consecutive uppercase letters followed by lowercase: XMLHttp -> XML_Http
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
      // Handle lowercase followed by uppercase: camelCase -> camel_Case
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      // Handle digit followed by letter: version2Update -> version2_Update
      .replace(/([0-9])([A-Z])/g, '$1_$2')
      // Replace hyphens with underscores
      .replace(/-/g, '_')
      // Replace one or more spaces with single underscore
      .replace(/\s+/g, '_')
      // Convert to lowercase
      .toLowerCase()
      // Remove multiple consecutive underscores
      .replace(/_+/g, '_')
      // Remove leading/trailing underscores
      .replace(/^_+|_+$/g, '')
  );
}
