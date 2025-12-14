# Fragmen 🧩

<!-- COVERAGE-BADGES:START -->

![Coverage](https://img.shields.io/badge/coverage-97%25-brightgreen)
![Lines](https://img.shields.io/badge/lines-96.25%25-brightgreen)
![Branches](https://img.shields.io/badge/branches-95.55%25-brightgreen)
![Functions](https://img.shields.io/badge/functions-98.26%25-brightgreen)
![Statements](https://img.shields.io/badge/statements-96.27%25-brightgreen)

<!-- COVERAGE-BADGES:END -->

[![npm version](https://img.shields.io/npm/v/fragmen.svg)](https://www.npmjs.com/package/fragmen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**"ShadCN but for helper functions."**

Fragmen is a CLI tool that lets you add high-quality, standalone TypeScript utility functions directly into your project. Instead of adding another dependency to your `package.json`, you get the source code. You own it, you can change it, and you won't have to worry about bundle size or breaking changes from a third-party library.

🌐 **[Browse utilities on the web →](https://fragmen.vercel.app)**

## Table of Contents

- [Core Philosophy](#core-philosophy)
- [Getting Started](#getting-started)
  - [1. Initialize Project](#1-initialize-project)
  - [2. Add a Fragment](#2-add-a-fragment)
- [Available Fragments](#available-fragments)
  - [Array Utilities](#array-utilities)
  - [Boolean Utilities](#boolean-utilities)
  - [Date Utilities](#date-utilities)
  - [Function Utilities](#function-utilities)
  - [JSON Utilities](#json-utilities)
  - [Number Utilities](#number-utilities)
  - [Object Utilities](#object-utilities)
  - [Promise Utilities](#promise-utilities)
  - [String Utilities](#string-utilities)
  - [URL Utilities](#url-utilities)
- [CLI Commands](#cli-commands)
- [Testing & Coverage](#testing--coverage)
- [Contributing](#contributing)
- [License](#license)

---

## Core Philosophy

- **Own Your Code**: Utilities are copied directly into your codebase under a `lib/utils` directory. This gives you full control to inspect, adapt, and learn from them.
- **Zero Dependencies**: Each fragment is self-contained. Adding a utility doesn't add to your `node_modules` folder.
- **TypeScript First**: All fragments are written in TypeScript with excellent type safety and JSDoc annotations.
- **Incremental Adoption**: Add only what you need, when you need it.

---

## Getting Started

Get started in three simple steps. Or **[browse all utilities on the website](https://fragmen.vercel.app)** to see what's available.

### 1. Initialize Project

Run the `init` command in the root of your project. This will create a `fragmen.json` file to configure where your utilities will be stored.

```bash
npx fragmen init
```

You'll be asked a few questions to set up your project:

```
✔ Where should utility functions be copied? › lib/utils
✔ Which language are you using? › TypeScript
✔ Which module system? › ESM (import/export)
```

This creates your `fragmen.json` configuration file.

### 2. Discover Utilities

There are three ways to discover and explore the 50+ available utilities:

#### Option A: Interactive Browse (Recommended)

Use the interactive `browse` command to visually explore utilities by category and add multiple at once:

```bash
npx fragmen browse
```

This opens an interactive menu where you can:

1. Select a category (with utility count shown)
2. Multi-select utilities using spacebar
3. Confirm and add all selected utilities at once

```
🔍 Browse Fragmen Utilities

? Select a category: (Use arrow keys)
❯ array (10 utilities)
  boolean (2 utilities)
  function (3 utilities)
  promise (3 utilities)
  string (11 utilities)
  ...

? Select utilities from promise: (Space to select, Enter to confirm)
❯◉ delay
 ◯ retry
 ◉ timeout

? Add 2 utilities? Yes

✓ promise/delay
✓ promise/timeout

✓ Successfully added 2 utilities
```

#### Option B: Preview Details

Use the `show` command to preview a utility's documentation, examples, and source before adding:

```bash
npx fragmen show promise/delay
```

This displays:

```
📖 promise/delay

Returns a promise that resolves after a given number of milliseconds.

Usage:
  fragmen add promise/delay

Example:
await delay(1000);
console.log('This runs after 1 second');

Source:
  registry/promise/delay/index.ts

To add this utility: fragmen add promise/delay
```

#### Option C: List All Utilities

Use the `list` command to see all available utilities organized by category:

```bash
# List all utilities
npx fragmen list

# Filter by category
npx fragmen list promise
npx fragmen list string
```

Output:

```
📦 Available Utilities

promise/ (3)
  • promise/delay
  • promise/retry
  • promise/timeout

string/ (11)
  • string/camel-case
  • string/capitalize
  ...

Total: 50 utilities
```

### 3. Add Utilities

Once you've discovered utilities you want, add them to your project:

#### Add Single Utility

Use the `add` command with the full path (category/utility-name):

```bash
npx fragmen add promise/delay
```

#### Add Multiple Utilities

Add multiple utilities in a single command for efficiency:

```bash
npx fragmen add promise/delay promise/retry string/capitalize
```

This will process all utilities with progress feedback:

```
Adding 3 utilities...

✓ promise/delay
✓ promise/retry
✓ string/capitalize

✓ Successfully added 3 utilities
  Location: lib/utils/
```

The utilities will be copied to your project:

```
your-project/
└── lib/
    └── utils/
        ├── promise-delay.ts
        ├── promise-retry.ts
        └── string-capitalize.ts
```

Now you can import and use them anywhere in your project:

```typescript
import { delay } from '@/lib/utils/promise-delay';
import { retry } from '@/lib/utils/promise-retry';
import { capitalize } from '@/lib/utils/string-capitalize';

// Use delay
await delay(1000);
console.log('This runs after 1 second');

// Use retry with fetch
const data = await retry(() => fetch('https://api.example.com'), {
  retries: 3,
});

// Use capitalize
const title = capitalize('hello world'); // 'Hello world'
```

---

## Available Fragments

This is the registry of available utility functions organized by category. Each utility is thoroughly tested and documented.

### Array Utilities

#### `array/group-by`

Groups the elements of an array based on the result of a callback function.

```typescript
import { groupBy } from '@/lib/utils/array-group-by';

const users = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Marketing' },
  { name: 'Charlie', department: 'Engineering' },
];

const byDepartment = groupBy(users, user => user.department);
// Result: { Engineering: [Alice, Charlie], Marketing: [Bob] }
```

#### `array/unique`

Returns a new array with only unique elements from the input array.

```typescript
import { unique } from '@/lib/utils/array-unique';

const numbers = [1, 2, 2, 3, 1, 4];
const uniqueNumbers = unique(numbers);
// Result: [1, 2, 3, 4]
```

#### `array/chunk`

Splits an array into chunks of a specified size.

```typescript
import { chunk } from '@/lib/utils/array-chunk';

const numbers = [1, 2, 3, 4, 5, 6, 7];
const chunks = chunk(numbers, 3);
// Result: [[1, 2, 3], [4, 5, 6], [7]]
```

#### `array/flatten`

Flattens nested arrays to a specified depth.

```typescript
import { flatten } from '@/lib/utils/array-flatten';

const nested = [1, [2, 3], [4, [5, 6]]];
const flat = flatten(nested);
// Result: [1, 2, 3, 4, [5, 6]]

const deepFlat = flatten(nested, Infinity);
// Result: [1, 2, 3, 4, 5, 6]
```

#### `array/intersection`

Finds the intersection of two or more arrays.

```typescript
import { intersection } from '@/lib/utils/array-intersection';

const arr1 = [1, 2, 3, 4];
const arr2 = [2, 3, 4, 5];
const common = intersection(arr1, arr2);
// Result: [2, 3, 4]
```

#### `array/compact`

Removes falsy values from an array.

```typescript
import { compact } from '@/lib/utils/array-compact';

const mixed = [0, 1, false, 2, '', 3, null, 4, undefined, 5, NaN];
const clean = compact(mixed);
// Result: [1, 2, 3, 4, 5]
```

#### `array/difference`

Creates an array of values from the first array that are not present in the other arrays.

```typescript
import { difference } from '@/lib/utils/array-difference';

const numbers = [1, 2, 3, 4, 5];
const toExclude = [2, 4];
const result = difference(numbers, toExclude);
// Result: [1, 3, 5]

const arr1 = ['a', 'b', 'c', 'd'];
const arr2 = ['b', 'd'];
const arr3 = ['a'];
const remaining = difference(arr1, arr2, arr3);
// Result: ['c']
```

#### `array/sort-by`

Sorts an array of objects by a property or using a custom function.

```typescript
import { sortBy } from '@/lib/utils/array-sort-by';

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

// Sort by property
const byAge = sortBy(users, 'age');
// Result: [Bob (25), Alice (30), Charlie (35)]

// Sort descending
const byAgeDesc = sortBy(users, 'age', 'desc');
// Result: [Charlie (35), Alice (30), Bob (25)]

// Sort by custom function
const byNameLength = sortBy(users, u => u.name.length);
// Result: [Bob, Alice, Charlie]
```

#### `array/union`

Creates an array of unique values from all provided arrays.

```typescript
import { union } from '@/lib/utils/array-union';

const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const arr3 = [3, 4, 5];
const combined = union(arr1, arr2, arr3);
// Result: [1, 2, 3, 4, 5]
```

#### `array/zip`

Creates an array of grouped elements from multiple arrays.

```typescript
import { zip } from '@/lib/utils/array-zip';

const names = ['Alice', 'Bob', 'Charlie'];
const ages = [25, 30, 35];
const cities = ['NYC', 'LA', 'Chicago'];
const combined = zip(names, ages, cities);
// Result: [['Alice', 25, 'NYC'], ['Bob', 30, 'LA'], ['Charlie', 35, 'Chicago']]
```

### Boolean Utilities

#### `boolean/is-falsy`

Checks if a value is falsy (false, 0, "", null, undefined, NaN).

```typescript
import { isFalsy } from '@/lib/utils/boolean-is-falsy';

isFalsy(''); // true
isFalsy(0); // true
isFalsy('hello'); // false
```

#### `boolean/is-truthy`

Checks if a value is truthy (anything that is not falsy).

```typescript
import { isTruthy } from '@/lib/utils/boolean-is-truthy';

isTruthy('hello'); // true
isTruthy([]); // true
isTruthy(0); // false
```

### Function Utilities

#### `function/debounce`

Creates a debounced function that delays invoking until after wait milliseconds have elapsed.

```typescript
import { debounce } from '@/lib/utils/function-debounce';

const handleSearch = (query: string) => console.log('Searching:', query);
const debouncedSearch = debounce(handleSearch, 300);

debouncedSearch('a'); // Canceled
debouncedSearch('ap'); // Canceled
debouncedSearch('app'); // Executes after 300ms
```

#### `function/once`

Creates a function that can only be invoked once. Subsequent calls return the result of the first invocation.

```typescript
import { once } from '@/lib/utils/function-once';

const initialize = () => {
  console.log('Initializing...');
  return { status: 'initialized' };
};

const initOnce = once(initialize);

const result1 = initOnce(); // Logs: 'Initializing...', returns { status: 'initialized' }
const result2 = initOnce(); // Returns cached result, no log
console.log(result1 === result2); // true
```

#### `function/throttle`

Creates a throttled function that only invokes the provided function at most once per specified time period.

```typescript
import { throttle } from '@/lib/utils/function-throttle';

const handleScroll = () => console.log('Scrolling...');
const throttledScroll = throttle(handleScroll, 200);

// Attach to scroll event
window.addEventListener('scroll', throttledScroll);
// Will execute immediately, then at most once every 200ms
```

### JSON Utilities

#### `json/safe-parse`

Safely parses a JSON string, returning undefined if parsing fails.

```typescript
import { safeParse } from '@/lib/utils/json-safe-parse';

const validJson = '{"name": "John"}';
const result = safeParse<{ name: string }>(validJson);
// Result: { name: "John" }

const invalidJson = '{name: "John"}';
const failed = safeParse(invalidJson);
// Result: undefined
```

### Object Utilities

#### `object/pick`

Creates a new object composed of the picked object properties.

```typescript
import { pick } from '@/lib/utils/object-pick';

const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
const publicInfo = pick(user, ['id', 'name']);
// Result: { id: 1, name: 'John' }
```

#### `object/omit`

Creates a new object by omitting specified keys from the source object.

```typescript
import { omit } from '@/lib/utils/object-omit';

const user = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  password: 'secret123',
};
const publicUser = omit(user, ['password', 'email']);
// Result: { id: 1, name: 'John' }
```

#### `object/merge`

Deep merges multiple objects into a single object.

```typescript
import { merge } from '@/lib/utils/object-merge';

const obj1 = { a: 1, b: { x: 1, y: 2 } };
const obj2 = { b: { z: 3 }, c: 4 };
const merged = merge(obj1, obj2);
// Result: { a: 1, b: { x: 1, y: 2, z: 3 }, c: 4 }
```

#### `object/clone`

Creates a deep copy of an object.

```typescript
import { clone } from '@/lib/utils/object-clone';

const original = { name: 'John', address: { city: 'NYC' } };
const cloned = clone(original);
cloned.address.city = 'LA';
console.log(original.address.city); // 'NYC' (unchanged)
```

#### `object/has-path`

Checks if a nested property path exists in an object.

```typescript
import { hasPath } from '@/lib/utils/object-has-path';

const user = { profile: { settings: { theme: 'dark' } } };
hasPath(user, 'profile.settings.theme'); // true
hasPath(user, 'profile.settings.language'); // false
```

### Promise Utilities

#### `promise/delay`

Returns a promise that resolves after a given number of milliseconds.

```typescript
import { delay } from '@/lib/utils/promise-delay';

// Simple delay
await delay(1000); // Wait 1 second
console.log('This runs after 1 second');

// Rate limiting
for (const item of items) {
  await processItem(item);
  await delay(100); // 100ms between each item
}
```

#### `promise/retry`

Retries a promise-returning function a specified number of times with exponential backoff.

```typescript
import { retry } from '@/lib/utils/promise-retry';

// Retry a fetch request
const fetchData = () => fetch('https://api.example.com/data');
const result = await retry(fetchData, { retries: 3 });

// Custom retry configuration
const result = await retry(fetchData, {
  retries: 5,
  delay: 500, // Start with 500ms delay
  backoff: 2, // Double delay each retry
});
```

#### `promise/timeout`

Wraps a promise with a timeout, rejecting if it doesn't resolve within the specified time.

```typescript
import { timeout } from '@/lib/utils/promise-timeout';

// Fetch with timeout
const fetchData = fetch('https://api.example.com/data');
const result = await timeout(fetchData, 5000);
// Rejects if fetch takes longer than 5 seconds

// Custom timeout message
const result = await timeout(slowOperation(), 3000, 'Operation took too long');
```

### String Utilities

#### `string/capitalize`

Capitalizes the first letter of a string while leaving the rest unchanged.

```typescript
import { capitalize } from '@/lib/utils/string-capitalize';

capitalize('hello world'); // 'Hello world'
capitalize('javaScript'); // 'JavaScript'
capitalize(''); // ''
```

#### `string/kebab-case`

Converts a string to kebab-case.

```typescript
import { kebabCase } from '@/lib/utils/string-kebab-case';

kebabCase('Hello World'); // 'hello-world'
kebabCase('firstName'); // 'first-name'
kebabCase('XMLHttpRequest'); // 'xml-http-request'
kebabCase('snake_case_string'); // 'snake-case-string'
```

#### `string/snake-case`

Converts a string to snake_case.

```typescript
import { snakeCase } from '@/lib/utils/string-snake-case';

snakeCase('Hello World'); // 'hello_world'
snakeCase('firstName'); // 'first_name'
snakeCase('XMLHttpRequest'); // 'xml_http_request'
snakeCase('kebab-case-string'); // 'kebab_case_string'
```

#### `string/camel-case`

Converts a string to camelCase.

```typescript
import { camelCase } from '@/lib/utils/string-camel-case';

camelCase('Hello World'); // 'helloWorld'
camelCase('first_name'); // 'firstName'
camelCase('kebab-case-string'); // 'kebabCaseString'
camelCase('PascalCase'); // 'pascalCase'
```

#### `string/pascal-case`

Converts a string to PascalCase.

```typescript
import { pascalCase } from '@/lib/utils/string-pascal-case';

pascalCase('Hello World'); // 'HelloWorld'
pascalCase('first_name'); // 'FirstName'
pascalCase('kebab-case-string'); // 'KebabCaseString'
pascalCase('camelCase'); // 'CamelCase'
```

#### `string/pad-end`

Pads the end of a string with another string until it reaches the target length.

```typescript
import { padEnd } from '@/lib/utils/string-pad-end';

padEnd('abc', 5, '0'); // 'abc00'
padEnd('hello', 10, '.'); // 'hello.....'
padEnd('test', 8); // 'test    ' (pads with spaces by default)
```

#### `string/pad-start`

Pads the start of a string with another string until it reaches the target length.

```typescript
import { padStart } from '@/lib/utils/string-pad-start';

padStart('abc', 5, '0'); // '00abc'
padStart('5', 3, '0'); // '005'
padStart('test', 8); // '    test' (pads with spaces by default)
```

#### `string/reverse`

Reverses the characters of a string.

```typescript
import { reverse } from '@/lib/utils/string-reverse';

reverse('hello'); // 'olleh'
reverse('JavaScript'); // 'tpircSavaJ'
reverse('12345'); // '54321'
```

#### `string/slugify`

Converts a string into a URL-friendly slug.

```typescript
import { slugify } from '@/lib/utils/string-slugify';

slugify('Hello World!'); // 'hello-world'
slugify('  Hello World!  -- 123  '); // 'hello-world-123'
slugify('français café'); // 'francais-cafe'
slugify('Hello World', { separator: '_' }); // 'hello_world'
```

#### `string/truncate`

Truncates a string if it's longer than the given maximum length.

```typescript
import { truncate } from '@/lib/utils/string-truncate';

truncate('Hello world, this is a long string', { length: 20 });
// 'Hello world, this...'

truncate('Short', { length: 20 }); // 'Short'

truncate('Hello world!', { length: 10, omission: '…' });
// 'Hello wor…'
```

#### `string/escape-html`

Escapes HTML special characters in a string to prevent XSS attacks.

```typescript
import { escapeHtml } from '@/lib/utils/string-escape-html';

escapeHtml('<script>alert("XSS")</script>');
// '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'

escapeHtml('5 < 10 & 10 > 5');
// '5 &lt; 10 &amp; 10 &gt; 5'

escapeHtml("It's a <test> & 'example'");
// 'It&#x27;s a &lt;test&gt; &amp; &#x27;example&#x27;'
```

### Number Utilities

#### `number/clamp`

Constrains a number to be within a specified range.

```typescript
import { clamp } from '@/lib/utils/number-clamp';

clamp(15, 10, 20); // 15
clamp(5, 10, 20); // 10
clamp(25, 10, 20); // 20
```

#### `number/random`

Generates a random number within a specified range.

```typescript
import { random } from '@/lib/utils/number-random';

random(1, 10); // Random float between 1 and 10
random(1, 10, { integer: true }); // Random integer between 1 and 10
random(0, 1); // Random float between 0 and 1
```

#### `number/round`

Rounds a number to a specified number of decimal places.

```typescript
import { round } from '@/lib/utils/number-round';

round(4.006, 2); // 4.01
round(4.006, 0); // 4
round(4.006); // 4
```

#### `number/format-number`

Formats a number with locale-specific formatting.

```typescript
import { formatNumber } from '@/lib/utils/number-format-number';

formatNumber(1234.56); // '1,234.56'
formatNumber(1234.56, { locale: 'de-DE' }); // '1.234,56'
formatNumber(1234.56, { minimumFractionDigits: 3 }); // '1,234.560'
```

#### `number/sum`

Calculates the sum of an array of numbers.

```typescript
import { sum } from '@/lib/utils/number-sum';

sum([1, 2, 3, 4, 5]); // 15
sum([10, -5, 3]); // 8
sum([2.5, 3.7, 1.8]); // 8
sum([]); // 0

const prices = [19.99, 29.99, 9.99];
const total = sum(prices); // 59.97
```

#### `number/average`

Calculates the average (arithmetic mean) of an array of numbers.

```typescript
import { average } from '@/lib/utils/number-average';

average([1, 2, 3, 4, 5]); // 3
average([10, 20, 30]); // 20
average([2.5, 3.5, 4.5]); // 3.5
average([]); // 0

const grades = [85, 92, 78, 95, 88];
const avgGrade = average(grades); // 87.6
```

### Date Utilities

#### `date/add-days`

Adds a specified number of days to a date.

```typescript
import { addDays } from '@/lib/utils/date-add-days';

const date = new Date('2024-01-15');
const future = addDays(date, 7); // 2024-01-22
const past = addDays(date, -7); // 2024-01-08
```

#### `date/format-date`

Formats a date using a flexible format string.

```typescript
import { formatDate } from '@/lib/utils/date-format-date';

const date = new Date('2024-03-15T14:30:00');

formatDate(date, 'YYYY-MM-DD'); // '2024-03-15'
formatDate(date, 'MM/DD/YYYY'); // '03/15/2024'
formatDate(date, 'DD MMM YYYY'); // '15 Mar 2024'
formatDate(date, 'HH:mm:ss'); // '14:30:00'
```

#### `date/is-weekend`

Checks if a date falls on a weekend (Saturday or Sunday).

```typescript
import { isWeekend } from '@/lib/utils/date-is-weekend';

const saturday = new Date('2024-03-16');
const monday = new Date('2024-03-18');

isWeekend(saturday); // true
isWeekend(monday); // false
```

#### `date/time-ago`

Formats a date as a relative time string (e.g., "2 hours ago").

```typescript
import { timeAgo } from '@/lib/utils/date-time-ago';

const now = new Date();
const past = new Date(now.getTime() - 2 * 60 * 60 * 1000);

timeAgo(past); // '2 hours ago'
timeAgo(new Date(now.getTime() - 30 * 1000)); // '30 seconds ago'
timeAgo(new Date(now.getTime() - 24 * 60 * 60 * 1000)); // '1 day ago'
```

### Object Utilities

#### `url/parse-url`

Parses a URL string into its component parts.

```typescript
import { parseUrl } from '@/lib/utils/url-parse-url';

parseUrl('https://example.com:8080/path?query=value#hash');
// {
//   protocol: 'https:',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/path',
//   search: '?query=value',
//   hash: '#hash',
//   origin: 'https://example.com:8080'
// }
```

#### `url/build-query`

Builds a URL query string from an object of parameters.

```typescript
import { buildQuery } from '@/lib/utils/url-build-query';

buildQuery({ name: 'John Doe', age: 30 });
// 'name=John%20Doe&age=30'

buildQuery({ tags: ['red', 'blue'], active: true });
// 'tags=red&tags=blue&active=true'

buildQuery({ search: 'hello world' }, { prefix: true });
// '?search=hello%20world'
```

#### `url/is-valid-url`

Checks if a string is a valid URL.

```typescript
import { isValidUrl } from '@/lib/utils/url-is-valid-url';

isValidUrl('https://example.com'); // true
isValidUrl('not-a-url'); // false
isValidUrl('https://example.com', { protocols: ['https'] }); // true
isValidUrl('example.com', { requireProtocol: false }); // true
```

#### `url/sanitize-url`

Sanitizes a URL by removing or encoding potentially dangerous elements.

```typescript
import { sanitizeUrl } from '@/lib/utils/url-sanitize-url';

sanitizeUrl('https://example.com/path?query=value');
// 'https://example.com/path?query=value'

sanitizeUrl('javascript:alert("xss")'); // null
sanitizeUrl('//example.com/path', { defaultProtocol: 'https' });
// 'https://example.com/path'
```

#### `url/resolve-url`

Resolves a relative URL against a base URL.

```typescript
import { resolveUrl } from '@/lib/utils/url-resolve-url';

resolveUrl('page.html', 'https://example.com/base/');
// 'https://example.com/base/page.html'

resolveUrl('../other.html', 'https://example.com/base/page.html');
// 'https://example.com/other.html'

resolveUrl('/absolute/path', 'https://example.com/base/');
// 'https://example.com/absolute/path'
```

---

## CLI Commands

Fragmen provides a comprehensive CLI with 6 commands to help you discover, preview, and add utilities to your project.

### `init`

Initialize your project with a `fragmen.json` configuration file.

```bash
npx fragmen init
```

This command will prompt you for:

- **Base directory**: Where utilities should be copied (default: `lib/utils`)
- **Language**: TypeScript or JavaScript
- **Module system**: ESM or CommonJS

Creates a `fragmen.json` file in your project root with your preferences.

---

### `browse`

**Interactive menu for discovering and adding utilities.** This is the recommended way to explore the registry.

```bash
npx fragmen browse
```

Features:

- **Category selection**: Browse utilities organized by category
- **Multi-select**: Use spacebar to select multiple utilities
- **Utility counts**: See how many utilities are in each category
- **Bulk add**: Add all selected utilities at once with progress feedback
- **Keyboard navigation**: Arrow keys to navigate, Enter to confirm, Ctrl+C to cancel

Example workflow:

```
🔍 Browse Fragmen Utilities

? Select a category: promise (3 utilities)
? Select utilities from promise:
  ◉ delay
  ◉ retry
  ◯ timeout

? Add 2 utilities? Yes

Adding 2 utilities...

✓ promise/delay
✓ promise/retry

✓ Successfully added 2 utilities
  Location: lib/utils/
```

---

### `show`

Preview detailed information about a utility before adding it.

```bash
npx fragmen show <category/utility-name>
```

**Examples:**

```bash
npx fragmen show promise/delay
npx fragmen show string/slugify
npx fragmen show array/chunk
```

Displays:

- **Description**: What the utility does (from JSDoc)
- **Usage command**: How to add it to your project
- **Code example**: How to use the utility
- **Source location**: Where to find the source code

Example output:

```
📖 promise/delay

Returns a promise that resolves after a given number of milliseconds.

Usage:
  fragmen add promise/delay

Example:
await delay(1000);
console.log('This runs after 1 second');

Source:
  registry/promise/delay/index.ts
```

---

### `list [category]`

Display all available utilities, optionally filtered by category.

```bash
# List all utilities (50+ total)
npx fragmen list

# List utilities in a specific category
npx fragmen list promise
npx fragmen list string
npx fragmen list array
npx fragmen list function
```

**Examples:**

```bash
# See all categories and utilities
$ npx fragmen list

📦 Available Utilities

array/ (10)
  • array/chunk
  • array/compact
  • array/difference
  ...

promise/ (3)
  • promise/delay
  • promise/retry
  • promise/timeout

string/ (11)
  • string/camel-case
  • string/capitalize
  ...

Total: 50 utilities

# Filter by category
$ npx fragmen list promise

📦 promise Utilities

promise/ (3)
  • promise/delay
  • promise/retry
  • promise/timeout

3 utilities in promise
```

---

### `add`

Copy one or more utilities from the registry into your project.

```bash
# Add a single utility
npx fragmen add <category/utility-name>

# Add multiple utilities at once
npx fragmen add <utility1> <utility2> <utility3>
```

**Examples:**

```bash
# Add a single utility
npx fragmen add promise/delay

# Add multiple utilities at once (bulk add)
npx fragmen add promise/delay promise/retry string/capitalize

# Add multiple utilities from different categories
npx fragmen add array/chunk array/unique number/clamp string/slugify
```

**Single utility output:**

```
Adding 1 utility...

✓ promise/delay

✓ Successfully added 1 utility
  Location: lib/utils/
```

**Bulk add output:**

```
Adding 3 utilities...

✓ promise/delay
✓ promise/retry
✓ string/capitalize

✓ Successfully added 3 utilities
  Location: lib/utils/
```

If any utilities fail to add (e.g., not found or incorrect path), the command will show which ones succeeded and which failed:

```
Adding 3 utilities...

✓ promise/delay
✗ promise/invalid - not found
✓ string/capitalize

✓ Successfully added 2 utilities
  Location: lib/utils/
✗ Failed to add 1:
  • promise/invalid

Run "fragmen list" to see available utilities
```

**Important:** You must specify the full path including the category (e.g., `promise/delay`, not just `delay`).

---

### `release`

Bump version and publish to npm (for maintainers only).

```bash
npx fragmen release [type]
```

Options:

- `patch` (default): 1.0.0 → 1.0.1
- `minor`: 1.0.0 → 1.1.0
- `major`: 1.0.0 → 2.0.0

Flags:

- `--no-push`: Skip pushing commit and tags
- `--no-publish`: Skip npm publish
- `--dry-run`: Show commands without executing
- `--tag <distTag>`: Publish under given npm dist-tag

---

## Quick Start Examples

### Example 1: Setting up a new project

```bash
# 1. Initialize configuration
npx fragmen init

# 2. Browse and add utilities interactively
npx fragmen browse
  # Select 'promise' category
  # Select 'delay' and 'retry'
  # Confirm

# 3. Start using them
import { delay, retry } from '@/lib/utils/promise-delay';
```

### Example 2: Adding specific utilities

```bash
# Preview what a utility does
npx fragmen show string/slugify

# Add it if you like it
npx fragmen add string/slugify

# Or add multiple at once
npx fragmen add string/slugify string/capitalize string/truncate
```

### Example 3: Exploring a category

```bash
# See what's available in the array category
npx fragmen list array

# Add the ones you need
npx fragmen add array/chunk array/unique array/flatten
```

---

## Testing & Coverage

This project uses Vitest for testing and includes comprehensive coverage reporting.

### Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with coverage in watch mode
npm run test:coverage:watch

# Generate coverage and open HTML report (macOS)
npm run test:coverage:open

# Check coverage thresholds
npm run test:coverage:check
```

### Coverage Configuration

The project is configured with coverage thresholds of 80% for:

- Lines
- Functions
- Branches
- Statements

Coverage reports are generated in multiple formats:

- **Text**: Displayed in terminal
- **JSON**: `coverage/coverage-final.json`
- **HTML**: `coverage/index.html` - Interactive report

### Coverage Scripts

For advanced coverage operations, use the coverage utility script:

```bash
# Generate coverage report
node scripts/coverage.js generate

# Run coverage in watch mode
node scripts/coverage.js watch

# Check if coverage meets thresholds
node scripts/coverage.js check
```

### Automatic Badge Updates

The coverage badges in this README are automatically updated by GitHub Actions whenever code is pushed to the main branch. This ensures the badges always reflect the current test coverage.

---

## Contributing

This project is open-source and contributions are welcome! Feel free to open an issue to suggest a new fragment or submit a pull request to add one.

## License

Licensed under the **MIT License**.
