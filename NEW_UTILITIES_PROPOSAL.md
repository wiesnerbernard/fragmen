# New Utilities Proposal for Fragmen v1.1.0

This document proposes 15 new utility functions to be added to Fragmen in the next release. Each utility addresses common development patterns and complements the existing collection.

## Table of Contents

1. [Array Utilities](#array-utilities) (3)
2. [String Utilities](#string-utilities) (3)
3. [Object Utilities](#object-utilities) (2)
4. [Number Utilities](#number-utilities) (2)
5. [Promise Utilities](#promise-utilities) (2)
6. [Function Utilities](#function-utilities) (1)
7. [Date Utilities](#date-utilities) (1)
8. [Validation Utilities](#validation-utilities) (1)

---

## Array Utilities

### 1. `array/shuffle`

**Purpose**: Randomly shuffles an array using the Fisher-Yates algorithm.

**Use Cases**:

- Randomizing quiz questions
- Shuffling a deck of cards
- Creating random playlists
- A/B testing with random assignment

**Implementation Priority**: High

**Example**:

```typescript
/**
 * Randomly shuffles an array using Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 * @example
 * shuffle([1, 2, 3, 4, 5])
 * // [3, 1, 5, 2, 4]
 *
 * shuffle(['a', 'b', 'c'])
 * // ['c', 'a', 'b']
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
```

**Test Cases**:

- Shuffles array correctly (test distribution over multiple runs)
- Returns new array (doesn't mutate original)
- Works with different data types
- Handles empty arrays
- Works with single-element arrays

---

### 2. `array/sample`

**Purpose**: Returns random element(s) from an array.

**Use Cases**:

- Picking random winner from participants
- Random testimonial/quote display
- Random product suggestions
- Game mechanics (drawing cards, rolling dice)

**Implementation Priority**: High

**Example**:

```typescript
/**
 * Returns random element(s) from an array
 * @param array The array to sample from
 * @param count Number of elements to sample (default: 1)
 * @returns Single element if count=1, otherwise array of elements
 * @example
 * sample([1, 2, 3, 4, 5])
 * // 3
 *
 * sample(['red', 'blue', 'green'], 2)
 * // ['blue', 'red']
 */
export function sample<T>(array: readonly T[], count?: 1): T;
export function sample<T>(array: readonly T[], count: number): T[];
export function sample<T>(array: readonly T[], count = 1): T | T[] {
  if (count === 1) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(count, array.length));
}
```

**Test Cases**:

- Returns single element when count=1
- Returns array when count>1
- Doesn't exceed array length
- Works with empty arrays
- Doesn't mutate original array

---

### 3. `array/partition`

**Purpose**: Splits array into two groups based on a predicate function.

**Use Cases**:

- Separating valid/invalid data
- Splitting active/inactive users
- Grouping passed/failed tests
- Categorizing true/false conditions

**Implementation Priority**: Medium

**Example**:

```typescript
/**
 * Splits an array into two groups based on a predicate
 * @param array The array to partition
 * @param predicate Function to test each element
 * @returns Tuple of [truthy, falsy] arrays
 * @example
 * partition([1, 2, 3, 4, 5], n => n % 2 === 0)
 * // [[2, 4], [1, 3, 5]]
 *
 * partition(users, user => user.active)
 * // [[activeUsers], [inactiveUsers]]
 */
export function partition<T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => boolean
): [T[], T[]] {
  const truthy: T[] = [];
  const falsy: T[] = [];

  array.forEach((item, index, arr) => {
    if (predicate(item, index, arr)) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  });

  return [truthy, falsy];
}
```

**Test Cases**:

- Correctly partitions based on predicate
- Handles empty arrays
- Preserves order within partitions
- Works with complex predicates
- Handles all-true and all-false cases

---

## String Utilities

### 4. `string/mask`

**Purpose**: Masks portions of a string (useful for sensitive data).

**Use Cases**:

- Hiding credit card numbers
- Masking email addresses
- Obscuring phone numbers
- Privacy protection in logs

**Implementation Priority**: High

**Example**:

```typescript
/**
 * Masks a portion of a string with a specified character
 * @param str The string to mask
 * @param options Masking options
 * @returns Masked string
 * @example
 * mask('4532-1234-5678-9010', { start: 4, end: -4 })
 * // '4532-****-****-9010'
 *
 * mask('user@example.com', { start: 2, end: -12 })
 * // 'us**@example.com'
 *
 * mask('555-1234', { start: 0, end: 3, char: 'X' })
 * // 'XXX-1234'
 */
export function mask(
  str: string,
  options: {
    start?: number;
    end?: number;
    char?: string;
  } = {}
): string {
  const { start = 0, end = str.length, char = '*' } = options;

  const startIndex = start < 0 ? str.length + start : start;
  const endIndex = end < 0 ? str.length + end : end;

  const before = str.slice(0, startIndex);
  const masked = char.repeat(endIndex - startIndex);
  const after = str.slice(endIndex);

  return before + masked + after;
}
```

**Test Cases**:

- Masks middle section correctly
- Handles negative indices
- Works with custom mask characters
- Handles edge cases (empty string, out of bounds)
- Preserves structure (hyphens, etc.)

---

### 5. `string/excerpt`

**Purpose**: Creates an excerpt from text with smart truncation at word boundaries.

**Use Cases**:

- Blog post previews
- Search result snippets
- Meta descriptions
- Card/tile text previews

**Implementation Priority**: Medium

**Example**:

```typescript
/**
 * Creates an excerpt from text with smart word-boundary truncation
 * @param text The text to excerpt
 * @param maxLength Maximum length of excerpt
 * @param suffix Suffix to append (default: '...')
 * @returns Excerpted text
 * @example
 * excerpt('The quick brown fox jumps over the lazy dog', 20)
 * // 'The quick brown...'
 *
 * excerpt('Hello world', 20)
 * // 'Hello world'
 *
 * excerpt('This is a very long sentence', 15, '…')
 * // 'This is a very…'
 */
export function excerpt(
  text: string,
  maxLength: number,
  suffix = '...'
): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Truncate to max length
  let truncated = text.slice(0, maxLength - suffix.length);

  // Find last complete word
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > 0) {
    truncated = truncated.slice(0, lastSpace);
  }

  return truncated + suffix;
}
```

**Test Cases**:

- Truncates at word boundaries
- Doesn't truncate if text is short enough
- Handles custom suffix
- Works with different text lengths
- Handles text without spaces

---

### 6. `string/title-case`

**Purpose**: Converts string to title case following standard capitalization rules.

**Use Cases**:

- Article/blog titles
- Proper heading formatting
- Name formatting
- UI labels

**Implementation Priority**: Medium

**Example**:

```typescript
/**
 * Converts a string to title case
 * @param str The string to convert
 * @returns Title-cased string
 * @example
 * titleCase('the quick brown fox')
 * // 'The Quick Brown Fox'
 *
 * titleCase('a tale of two cities')
 * // 'A Tale of Two Cities'
 *
 * titleCase('hello-world')
 * // 'Hello-World'
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

**Test Cases**:

- Capitalizes first letter of each word
- Handles multiple spaces
- Works with different delimiters
- Handles empty strings
- Preserves special characters

---

## Object Utilities

### 7. `object/deep-equal`

**Purpose**: Performs deep equality comparison between two objects.

**Use Cases**:

- Testing and assertions
- Comparing form state
- Change detection
- Cache validation

**Implementation Priority**: High

**Example**:

```typescript
/**
 * Performs deep equality comparison between two values
 * @param a First value
 * @param b Second value
 * @returns True if deeply equal, false otherwise
 * @example
 * deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })
 * // true
 *
 * deepEqual([1, 2, 3], [1, 2, 3])
 * // true
 *
 * deepEqual({ a: 1 }, { a: 2 })
 * // false
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;

  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual((a as any)[key], (b as any)[key])) return false;
  }

  return true;
}
```

**Test Cases**:

- Compares nested objects
- Handles arrays
- Handles primitives
- Handles null/undefined
- Handles circular references (optional)

---

### 8. `object/flatten-keys`

**Purpose**: Flattens nested object into dot-notation keys.

**Use Cases**:

- Converting nested config to flat format
- Form data serialization
- Query parameter generation
- CSV export preparation

**Implementation Priority**: Medium

**Example**:

```typescript
/**
 * Flattens a nested object into dot-notation keys
 * @param obj The object to flatten
 * @param prefix Key prefix (used internally for recursion)
 * @returns Flattened object
 * @example
 * flattenKeys({ a: { b: { c: 1 } } })
 * // { 'a.b.c': 1 }
 *
 * flattenKeys({ user: { name: 'John', address: { city: 'NYC' } } })
 * // { 'user.name': 'John', 'user.address.city': 'NYC' }
 */
export function flattenKeys(
  obj: Record<string, any>,
  prefix = ''
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenKeys(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
}
```

**Test Cases**:

- Flattens nested objects
- Handles arrays (doesn't flatten them)
- Handles primitives
- Works with deep nesting
- Handles empty objects

---

## Number Utilities

### 9. `number/percentage`

**Purpose**: Calculates percentage with optional precision and formatting.

**Use Cases**:

- Progress bars
- Statistics display
- Completion rates
- Score calculations

**Implementation Priority**: Medium

**Example**:

```typescript
/**
 * Calculates percentage with optional formatting
 * @param value The numerator
 * @param total The denominator
 * @param options Formatting options
 * @returns Percentage (formatted or numeric)
 * @example
 * percentage(25, 100)
 * // 25
 *
 * percentage(1, 3, { decimals: 2 })
 * // 33.33
 *
 * percentage(75, 100, { format: true })
 * // '75%'
 */
export function percentage(
  value: number,
  total: number,
  options: {
    decimals?: number;
    format?: boolean;
  } = {}
): number | string {
  const { decimals = 0, format = false } = options;

  if (total === 0) return format ? '0%' : 0;

  const percent = (value / total) * 100;
  const rounded = Number(percent.toFixed(decimals));

  return format ? `${rounded}%` : rounded;
}
```

**Test Cases**:

- Calculates correct percentage
- Handles decimal precision
- Formats with % symbol
- Handles division by zero
- Handles negative numbers

---

### 10. `number/in-range`

**Purpose**: Checks if a number falls within a specified range.

**Use Cases**:

- Validation (age, price ranges)
- Game boundaries
- Date range checks
- Filtering data

**Implementation Priority**: Low

**Example**:

```typescript
/**
 * Checks if a number is within a specified range
 * @param value The number to check
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @returns True if in range, false otherwise
 * @example
 * inRange(5, 1, 10)
 * // true
 *
 * inRange(15, 1, 10)
 * // false
 *
 * inRange(1, 1, 10)
 * // true (inclusive)
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
```

**Test Cases**:

- Returns true for values in range
- Returns false for out-of-range values
- Handles boundary values (inclusive)
- Works with negative numbers
- Handles reversed min/max

---

## Promise Utilities

### 11. `promise/all-settled-typed`

**Purpose**: Type-safe version of Promise.allSettled with better result handling.

**Use Cases**:

- Batch API calls with error handling
- Parallel operations where some can fail
- Data fetching from multiple sources
- Graceful degradation

**Implementation Priority**: High

**Example**:

```typescript
/**
 * Type-safe Promise.allSettled with separated results
 * @param promises Array of promises
 * @returns Object with fulfilled and rejected arrays
 * @example
 * const { fulfilled, rejected } = await allSettledTyped([
 *   fetch('/api/user'),
 *   fetch('/api/posts'),
 *   fetch('/api/comments')
 * ]);
 *
 * console.log(fulfilled.length); // Successful requests
 * console.log(rejected.length); // Failed requests
 */
export async function allSettledTyped<T>(promises: Promise<T>[]): Promise<{
  fulfilled: T[];
  rejected: Error[];
}> {
  const results = await Promise.allSettled(promises);

  const fulfilled: T[] = [];
  const rejected: Error[] = [];

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      fulfilled.push(result.value);
    } else {
      rejected.push(result.reason);
    }
  });

  return { fulfilled, rejected };
}
```

**Test Cases**:

- Separates fulfilled and rejected promises
- Handles all promises succeeding
- Handles all promises failing
- Handles mixed results
- Preserves types correctly

---

### 12. `promise/race-with-timeout`

**Purpose**: Race between a promise and a timeout, with custom timeout error.

**Use Cases**:

- API calls with maximum wait time
- User interactions with fallback
- Resource loading with timeout
- Performance monitoring

**Implementation Priority**: Medium

**Example**:

```typescript
/**
 * Races a promise against a timeout
 * @param promise The promise to race
 * @param timeoutMs Timeout in milliseconds
 * @param errorMessage Custom error message
 * @returns Promise result or timeout error
 * @example
 * await raceWithTimeout(fetch('/api/data'), 5000)
 * // Resolves with data or throws after 5s
 *
 * await raceWithTimeout(
 *   longOperation(),
 *   3000,
 *   'Operation took too long'
 * )
 */
export async function raceWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage = 'Operation timed out'
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}
```

**Test Cases**:

- Returns promise result if it resolves first
- Throws timeout error if promise is slow
- Uses custom error message
- Handles promise rejection
- Works with different timeout values

---

## Function Utilities

### 13. `function/pipe`

**Purpose**: Composes functions left-to-right (opposite of compose).

**Use Cases**:

- Data transformation pipelines
- Functional programming patterns
- Request/response middleware
- Data processing flows

**Implementation Priority**: Medium

**Example**:

```typescript
/**
 * Pipes value through a series of functions (left-to-right)
 * @param fns Functions to pipe through
 * @returns Piped function
 * @example
 * const transform = pipe(
 *   (x: number) => x * 2,
 *   (x: number) => x + 1,
 *   (x: number) => x.toString()
 * );
 *
 * transform(5); // '11'
 */
export function pipe<T>(...fns: Array<(arg: any) => any>) {
  return (value: T) => {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}
```

**Test Cases**:

- Applies functions in correct order
- Handles single function
- Handles multiple functions
- Passes value through correctly
- Maintains types (with proper overloads)

---

## Date Utilities

### 14. `date/diff`

**Purpose**: Calculates difference between two dates in specified units.

**Use Cases**:

- Age calculation
- Duration display
- Countdown timers
- Date range validation

**Implementation Priority**: High

**Example**:

```typescript
/**
 * Calculates difference between two dates
 * @param date1 First date
 * @param date2 Second date
 * @param unit Unit of measurement
 * @returns Difference in specified unit
 * @example
 * diff(new Date('2024-01-01'), new Date('2024-01-02'), 'days')
 * // 1
 *
 * diff(new Date('2024-01-01'), new Date('2024-02-01'), 'months')
 * // 1
 *
 * diff(new Date('2024-01-01 10:00'), new Date('2024-01-01 12:00'), 'hours')
 * // 2
 */
export function diff(
  date1: Date,
  date2: Date,
  unit:
    | 'milliseconds'
    | 'seconds'
    | 'minutes'
    | 'hours'
    | 'days'
    | 'months'
    | 'years'
): number {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());

  const conversions = {
    milliseconds: 1,
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    months: 1000 * 60 * 60 * 24 * 30, // Approximate
    years: 1000 * 60 * 60 * 24 * 365, // Approximate
  };

  return Math.floor(diffMs / conversions[unit]);
}
```

**Test Cases**:

- Calculates differences in all units
- Handles dates in any order
- Returns absolute values
- Works with same dates (returns 0)
- Handles edge cases (leap years, etc.)

---

## Validation Utilities

### 15. `validation/is-url`

**Purpose**: Validates if a string is a valid URL (more comprehensive than `url/is-valid-url`).

**Use Cases**:

- Form validation
- Link validation
- API input validation
- Content moderation

**Implementation Priority**: Low

**Example**:

```typescript
/**
 * Validates if a string is a valid URL with protocol
 * @param str String to validate
 * @param options Validation options
 * @returns True if valid URL, false otherwise
 * @example
 * isUrl('https://example.com')
 * // true
 *
 * isUrl('example.com')
 * // false (no protocol)
 *
 * isUrl('ftp://files.example.com', { protocols: ['http', 'https', 'ftp'] })
 * // true
 */
export function isUrl(
  str: string,
  options: {
    protocols?: string[];
    requireProtocol?: boolean;
  } = {}
): boolean {
  const { protocols = ['http', 'https'], requireProtocol = true } = options;

  try {
    const url = new URL(str);

    if (requireProtocol && !url.protocol) {
      return false;
    }

    if (protocols.length > 0) {
      const protocol = url.protocol.replace(':', '');
      if (!protocols.includes(protocol)) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}
```

**Test Cases**:

- Validates URLs with protocols
- Rejects URLs without protocols (when required)
- Validates specific protocols
- Handles malformed URLs
- Works with international domains

---

## Summary

### Priority Distribution

- **High Priority** (7): `shuffle`, `sample`, `mask`, `deep-equal`, `all-settled-typed`, `diff`, `is-url`
- **Medium Priority** (6): `partition`, `excerpt`, `title-case`, `flatten-keys`, `percentage`, `race-with-timeout`, `pipe`
- **Low Priority** (2): `in-range`, `is-url` (duplicate with existing)

### Category Distribution

- **Array**: 3 utilities (shuffle, sample, partition)
- **String**: 3 utilities (mask, excerpt, title-case)
- **Object**: 2 utilities (deep-equal, flatten-keys)
- **Number**: 2 utilities (percentage, in-range)
- **Promise**: 2 utilities (all-settled-typed, race-with-timeout)
- **Function**: 1 utility (pipe)
- **Date**: 1 utility (diff)
- **Validation**: 1 utility (is-url)

### Implementation Roadmap

**Phase 1** (High Priority - v1.1.0):

1. `array/shuffle`
2. `array/sample`
3. `string/mask`
4. `object/deep-equal`
5. `promise/all-settled-typed`
6. `date/diff`

**Phase 2** (Medium Priority - v1.2.0): 7. `array/partition` 8. `string/excerpt` 9. `string/title-case` 10. `object/flatten-keys` 11. `number/percentage` 12. `promise/race-with-timeout` 13. `function/pipe`

**Phase 3** (Low Priority - v1.3.0): 14. `number/in-range` 15. `validation/is-url`

---

## Additional Considerations

### Existing Utilities to Reference

- **Storage utilities** (`storage/local-storage`) - already implemented
- **Crypto utilities** (`crypto/random-string`, `crypto/uuid`) - already implemented
- **Validation utilities** (`validation/is-equal`, `validation/is-empty`) - already implemented

These can serve as implementation patterns for the new utilities.

### Testing Requirements

Each utility must include:

- ✅ Unit tests with 90%+ coverage
- ✅ JSDoc documentation with examples
- ✅ Type definitions
- ✅ Edge case handling
- ✅ Performance considerations

### Documentation Updates

When implementing:

1. Update README.md with utility descriptions
2. Update CHANGELOG.md with new additions
3. Update `fragmen.schema.json`
4. Add to web documentation
5. Update coverage badges

---

_Proposal Date: [Current Date]_
_Target Release: v1.1.0_
_Estimated Implementation Time: 2-3 weeks_
