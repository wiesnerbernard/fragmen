// lib/utils/string/slugify.ts

/**
 * Converts a string into a URL-friendly slug.
 *
 * This function performs the following steps:
 * 1. Converts the string to lower case.
 * 2. Replaces diacritics (e.g., français -> francais) and special cases like 'ß' -> 'ss'.
 * 3. Replaces one or more spaces with the chosen separator (default '-').
 * 4. Replaces '&' with 'and' surrounded by separators.
 * 5. Removes non-word characters except the chosen separator.
 * 6. Collapses multiple separators and trims from start/end.
 *
 * @tags url, formatting, sanitization
 * @param str The string to convert.
 * @param options Options for slugification.
 * @param options.separator The character to use as a word separator. Defaults to '-'.
 *   Any single character is supported; occurrences of '-' in the normalized string
 *   are unified to the chosen separator.
 * @returns The slugified string.
 *   Returns '' for non-string input or whitespace-only strings.
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

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const sepRe = new RegExp(`${escapeRegExp(separator)}+`, 'g');
  const sepTrimStart = new RegExp(`^${escapeRegExp(separator)}+`);
  const sepTrimEnd = new RegExp(`${escapeRegExp(separator)}+$`);

  return (
    str
      .toString()
      .toLowerCase()
      // Special-case mappings not representable by single-codepoint mapping
      .replace(/ß/g, 'ss')
      // Replace diacritics/special latin chars
      .replace(p, c => b.charAt(a.indexOf(c)))
      // Replace spaces with chosen separator
      .replace(/\s+/g, separator)
      // Replace & with 'and' surrounded by separators
      .replace(/&/g, `${separator}and${separator}`)
      // Remove all non-word chars except for hyphen and chosen separator
      .replace(new RegExp(`[^\\w\\s${escapeRegExp(separator)}-]+`, 'g'), '')
      // Unify any hyphens produced by mapping into the chosen separator
      .replace(/-/g, separator)
      // Collapse multiple separators into one
      .replace(sepRe, separator)
      // Trim separators from start and end
      .replace(sepTrimStart, '')
      .replace(sepTrimEnd, '')
  );
}
