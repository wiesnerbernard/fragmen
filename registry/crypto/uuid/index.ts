/**
 * Generates a UUID v4 (Universally Unique Identifier).
 *
 * Creates a random UUID using cryptographically strong random values
 * when available (crypto.randomUUID or crypto.getRandomValues), falling
 * back to Math.random() if needed. Follows RFC 4122 version 4 format.
 *
 * @tags crypto, pure
 * @returns A UUID v4 string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 *
 * @example
 * ```typescript
 * const id1 = uuid();
 * // '550e8400-e29b-41d4-a716-446655440000'
 *
 * const id2 = uuid();
 * // 'c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd'
 *
 * // Each call generates a unique identifier
 * const ids = Array.from({ length: 100 }, () => uuid());
 * const uniqueIds = new Set(ids);
 * console.log(uniqueIds.size === 100); // true
 * ```
 */
export function uuid(): string {
  // Use native crypto.randomUUID if available (Node 16.7.0+, modern browsers)
  if (
    typeof crypto !== 'undefined' &&
    'randomUUID' in crypto &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  // Fallback: Use crypto.getRandomValues if available
  if (
    typeof crypto !== 'undefined' &&
    'getRandomValues' in crypto &&
    typeof (crypto as Crypto).getRandomValues === 'function'
  ) {
    const bytes = (crypto as Crypto).getRandomValues(new Uint8Array(16));

    // Set version (4) and variant bits
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, (byte: number) =>
      byte.toString(16).padStart(2, '0')
    ).join('');

    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  // Last resort: Math.random() based UUID (less secure, but works everywhere)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
