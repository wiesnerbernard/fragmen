// lib/utils/string/slugify.ts

/**
 * Converts a string into a URL-friendly slug.
 *
 * This function performs the following steps:
 * 1. Converts the string to lower case.
 * 2. Removes non-alphanumeric characters except for hyphens and spaces.
 * 3. Replaces one or more spaces with a single separator.
 * 4. Trims leading/trailing separators.
 *
 * @param str The string to convert.
 * @param options Options for slugification.
 * @param options.separator The character to use as a word separator. Defaults to '-'.
 * @returns The slugified string.
 * @example
 * slugify('  Hello World!  -- 123  ')
 * // => 'hello-world-123'
 */
export function slugify(str: string, options?: { separator?: string }): string {
  const separator = options?.separator ?? '-';

  if (typeof str !== 'string' || str.trim() === '') {
    return '';
  }

  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, separator) // Replace spaces with separator
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, `${separator}and${separator}`) // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(new RegExp(`\\${separator}+`, 'g'), separator) // Replace multiple separators with a single one
    .replace(new RegExp(`^\\${separator}+`), '') // Trim separator from start
    .replace(new RegExp(`\\${separator}+$`), ''); // Trim separator from end
}
