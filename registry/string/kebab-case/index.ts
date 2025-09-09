/**
 * Converts a string to kebab-case.
 *
 * Transforms a string by converting it to lowercase and replacing spaces, underscores,
 * and camelCase boundaries with hyphens. Useful for creating URL slugs, CSS class names,
 * and file names.
 *
 * @param str The string to convert
 * @returns The kebab-case version of the string
 *
 * @example
 * ```typescript
 * kebabCase('Hello World'); // 'hello-world'
 * kebabCase('firstName'); // 'first-name'
 * kebabCase('XMLHttpRequest'); // 'xml-http-request'
 * kebabCase('snake_case_string'); // 'snake-case-string'
 * kebabCase('  multiple   spaces  '); // 'multiple-spaces'
 * kebabCase('already-kebab-case'); // 'already-kebab-case'
 * kebabCase(''); // ''
 * ```
 */
export function kebabCase(str: string): string {
  if (!str) {
    return '';
  }

  return (
    str
      .trim()
      // Handle consecutive uppercase letters followed by lowercase: XMLHttp -> XML-Http
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      // Handle lowercase followed by uppercase: camelCase -> camel-Case
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Handle digit followed by letter: version2Update -> version2-Update
      .replace(/([0-9])([A-Z])/g, '$1-$2')
      // Replace underscores with hyphens
      .replace(/_/g, '-')
      // Replace one or more spaces with single hyphen
      .replace(/\s+/g, '-')
      // Convert to lowercase
      .toLowerCase()
      // Remove multiple consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
  );
}
