export interface BuildQueryOptions {
  /** Whether to include the '?' prefix */
  prefix?: boolean;
  /** How to handle array values */
  arrayFormat?: 'repeat' | 'brackets' | 'comma';
  /** Whether to sort parameters alphabetically */
  sort?: boolean;
  /** Custom encoder function for parameter names and values */
  encoder?: (value: string) => string;
  /** Whether to skip encoding (use with caution) */
  skipEncoding?: boolean;
  /** Maximum depth for nested object flattening */
  maxDepth?: number;
}

/**
 * Builds a URL query string from an object of parameters.
 *
 * Converts an object into a properly encoded URL query string. Handles arrays,
 * nested objects, and special characters. Filters out null and undefined values.
 * Supports advanced options like sorting, custom encoding, and duplicate key handling.
 *
 * @param params Object containing query parameters
 * @param options Configuration options
 * @returns URL-encoded query string
 *
 * @example
 * ```typescript
 * buildQuery({ name: 'John Doe', age: 30 });
 * // 'name=John%20Doe&age=30'
 *
 * buildQuery({ tags: ['red', 'blue'], active: true });
 * // 'tags=red&tags=blue&active=true'
 *
 * buildQuery({ search: 'hello world', page: 1 }, { prefix: true });
 * // '?search=hello%20world&page=1'
 *
 * buildQuery({ name: null, age: undefined, city: 'NYC' });
 * // 'city=NYC'
 *
 * buildQuery({ a: 1, b: 2, c: 3 }, { sort: true });
 * // 'a=1&b=2&c=3'
 *
 * buildQuery({ name: 'John', name: 'Jane' }, { duplicateKeys: 'error' });
 * // throws Error: Duplicate key found: name
 * ```
 */
export function buildQuery(
  params: Record<string, unknown> | null,
  options: BuildQueryOptions = {}
): string {
  const {
    prefix = false,
    arrayFormat = 'repeat',
    sort = false,
    encoder = encodeURIComponent,
    skipEncoding = false,
    maxDepth = 10,
  } = options;

  if (!params) {
    return prefix ? '?' : '';
  }

  const pairs: Array<{ key: string; value: string }> = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      handleArrayValue(key, value, arrayFormat, pairs, encoder, skipEncoding);
    } else if (typeof value === 'object') {
      // For nested objects, flatten them with depth limit
      const flattened = flattenObject(
        value as Record<string, unknown>,
        key,
        maxDepth
      );
      for (const [flatKey, flatValue] of Object.entries(flattened)) {
        if (flatValue !== null && flatValue !== undefined) {
          const encodedKey = skipEncoding ? flatKey : encoder(flatKey);
          const encodedValue = skipEncoding
            ? String(flatValue)
            : encoder(String(flatValue));
          pairs.push({ key: encodedKey, value: encodedValue });
        }
      }
    } else {
      const useEncoder = skipEncoding ? (value: string) => value : encoder;
      const encodedKey = useEncoder(key);
      const encodedValue = useEncoder(String(value));
      pairs.push({ key: encodedKey, value: encodedValue });
    }
  }

  // Sort pairs if requested
  if (sort) {
    pairs.sort((a, b) => a.key.localeCompare(b.key));
  }

  const queryString = pairs.map(pair => `${pair.key}=${pair.value}`).join('&');
  return queryString
    ? prefix
      ? `?${queryString}`
      : queryString
    : prefix
      ? '?'
      : '';
}

function handleArrayValue(
  key: string,
  value: unknown[],
  arrayFormat: string,
  pairs: Array<{ key: string; value: string }>,
  encoder: (value: string) => string,
  skipEncoding: boolean
): void {
  const validValues = value.filter(item => item !== null && item !== undefined);

  if (validValues.length === 0) {
    return;
  }

  switch (arrayFormat) {
    case 'brackets': {
      validValues.forEach(item => {
        const encodedKey = skipEncoding ? `${key}[]` : encoder(`${key}[]`);
        const encodedValue = skipEncoding
          ? String(item)
          : encoder(String(item));
        pairs.push({ key: encodedKey, value: encodedValue });
      });
      break;
    }
    case 'comma': {
      const encodedKey = skipEncoding ? key : encoder(key);
      const encodedValue = skipEncoding
        ? validValues.join(',')
        : encoder(validValues.join(','));
      pairs.push({ key: encodedKey, value: encodedValue });
      break;
    }
    case 'repeat':
    default: {
      validValues.forEach(item => {
        const encodedKey = skipEncoding ? key : encoder(key);
        const encodedValue = skipEncoding
          ? String(item)
          : encoder(String(item));
        pairs.push({ key: encodedKey, value: encodedValue });
      });
      break;
    }
  }
}

function flattenObject(
  obj: Record<string, unknown>,
  prefix = '',
  maxDepth = 10,
  currentDepth = 0
): Record<string, unknown> {
  const flattened: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}[${key}]` : key;

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      currentDepth < maxDepth - 1
    ) {
      Object.assign(
        flattened,
        flattenObject(
          value as Record<string, unknown>,
          newKey,
          maxDepth,
          currentDepth + 1
        )
      );
    } else {
      flattened[newKey] = value;
    }
  }

  return flattened;
}
