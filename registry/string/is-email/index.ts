/**
 * Validates if a string is a valid email address.
 *
 * Uses a practical regex pattern that covers most common email formats
 * while avoiding overly complex RFC-strict validation. Handles international
 * characters in the local part and common TLDs.
 *
 * @tags validation, string-manipulation
 * @param email The string to validate as an email
 * @returns True if the string is a valid email format, false otherwise
 *
 * @example
 * ```typescript
 * isEmail('user@example.com'); // true
 * isEmail('user.name+tag@example.co.uk'); // true
 * isEmail('invalid.email'); // false
 * isEmail('missing@domain'); // false
 * isEmail('@example.com'); // false
 * isEmail(''); // false
 * ```
 */
export function isEmail(email: string): boolean {
  if (typeof email !== 'string' || email.trim() === '') {
    return false;
  }

  // Practical email regex that covers most common cases
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Basic validation
  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional checks
  const [local, domain] = email.split('@');

  // Local part (before @) constraints
  if (local.length > 64 || local.startsWith('.') || local.endsWith('.')) {
    return false;
  }

  // Domain part (after @) constraints
  if (domain.length > 255 || domain.startsWith('-') || domain.endsWith('-')) {
    return false;
  }

  return true;
}
