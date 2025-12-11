/**
 * Escapes HTML special characters in a string to prevent XSS attacks.
 *
 * Converts characters that have special meaning in HTML into their corresponding
 * HTML entities. Essential for safely displaying user-generated content in web pages.
 *
 * @param str The string to escape
 * @returns The string with HTML special characters escaped
 *
 * @example
 * ```typescript
 * escapeHtml('<script>alert("XSS")</script>');
 * // '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
 *
 * escapeHtml('5 < 10 & 10 > 5');
 * // '5 &lt; 10 &amp; 10 &gt; 5'
 *
 * escapeHtml("It's a <test> & 'example'");
 * // 'It&#x27;s a &lt;test&gt; &amp; &#x27;example&#x27;'
 *
 * escapeHtml('Hello, World!');
 * // 'Hello, World!' (no changes)
 *
 * // Safe display of user input
 * const userInput = '<img src=x onerror=alert(1)>';
 * const safe = escapeHtml(userInput);
 * document.body.innerHTML = safe; // Safe to display
 * ```
 */
export function escapeHtml(str: string): string {
  // Handle edge cases
  if (typeof str !== 'string') {
    return '';
  }

  if (str.length === 0) {
    return '';
  }

  // Map of characters to their HTML entities
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  // Replace special characters with their HTML entities
  return str.replace(/[&<>"'/]/g, char => htmlEscapeMap[char]);
}
