export interface BuildQueryOptions {
  /** Whether to include the '?' prefix */
  prefix?: boolean;
  /** How to handle array values */
  arrayFormat?: 'repeat' | 'brackets' | 'comma';
}

/**
 * Builds a URL query string from an object of parameters.
 *
 * Converts an object into a properly encoded URL query string. Handles arrays,
 * nested objects, and special characters. Filters out null and undefined values.
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
 * ```
 */
export function buildQuery(
  params: Record<string, unknown> | null,
  options: BuildQueryOptions = {}
): string {
  const { prefix = false, arrayFormat = 'repeat' } = options;

  if (!params) {
    return prefix ? '?' : '';
  }

  const pairs: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      handleArrayValue(key, value, arrayFormat, pairs);
    } else if (typeof value === 'object') {
      // For nested objects, flatten them
      const flattened = flattenObject(value as Record<string, unknown>, key);
      for (const [flatKey, flatValue] of Object.entries(flattened)) {
        if (flatValue !== null && flatValue !== undefined) {
          pairs.push(
            `${encodeURIComponent(flatKey)}=${encodeURIComponent(String(flatValue))}`
          );
        }
      }
    } else {
      pairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );
    }
  }

  const queryString = pairs.join('&');
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
  pairs: string[]
): void {
  const validValues = value.filter(item => item !== null && item !== undefined);

  if (validValues.length === 0) {
    return;
  }

  switch (arrayFormat) {
    case 'brackets':
      validValues.forEach(item => {
        pairs.push(
          `${encodeURIComponent(`${key}[]`)}=${encodeURIComponent(String(item))}`
        );
      });
      break;
    case 'comma':
      pairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(validValues.join(','))}`
      );
      break;
    case 'repeat':
    default:
      validValues.forEach(item => {
        pairs.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`
        );
      });
      break;
  }
}

function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, unknown> {
  const flattened: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}[${key}]` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(
        flattened,
        flattenObject(value as Record<string, unknown>, newKey)
      );
    } else {
      flattened[newKey] = value;
    }
  }

  return flattened;
}
