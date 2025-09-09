# Fragmen 🧩

<!-- COVERAGE-BADGES:START -->

![Coverage](https://img.shields.io/badge/coverage-98%25-brightgreen)
![Lines](https://img.shields.io/badge/lines-98.41%25-brightgreen)
![Branches](https://img.shields.io/badge/branches-96.95%25-brightgreen)
![Functions](https://img.shields.io/badge/functions-100%25-brightgreen)
![Statements](https://img.shields.io/badge/statements-98.41%25-brightgreen)

<!-- COVERAGE-BADGES:END -->

**"ShadCN but for helper functions."**

Fragmen is a CLI tool that lets you add high-quality, standalone TypeScript utility functions directly into your project. Instead of adding another dependency to your `package.json`, you get the source code. You own it, you can change it, and you won't have to worry about bundle size or breaking changes from a third-party library.

## Table of Contents

- [Core Philosophy](#core-philosophy)
- [Getting Started](#getting-started)
  - [1. Initialize Project](#1-initialize-project)
  - [2. Add a Fragment](#2-add-a-fragment)
- [Available Fragments](#available-fragments)
  - [Array Utilities](#array-utilities)
  - [Boolean Utilities](#boolean-utilities)
  - [Function Utilities](#function-utilities)
  - [JSON Utilities](#json-utilities)
  - [Object Utilities](#object-utilities)
  - [Promise Utilities](#promise-utilities)
  - [String Utilities](#string-utilities)
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

Get started in two simple steps.

### 1. Initialize Project

Run the `init` command in the root of your project. This will create a `shards.json` file to configure where your utilities will be stored.

```bash
npx fragmen init
```

You'll be asked a few questions to set up your project:

```
✔ Where should we save your fragments? › lib/utils
✔ Are you using TypeScript? › Yes
✔ Which module system are you using? › ESM
```

This creates your `shards.json` file.

### 2. Add a Fragment

Use the `add` command to select and install a fragment. Let's add the `capitalize` utility.

```bash
npx fragmen add string/capitalize
```

This will add the file to your project at the specified path:

```
your-project/
└── src/
    └── utils/
        └── capitalize.ts   <-- Your new fragment!
```

Now you can import it and use it anywhere in your project:

```typescript
import { capitalize } from '@/lib/utils/string/capitalize';

console.log(capitalize('hello world')); // "Hello world"
```

---

## Available Fragments

This is the registry of available utility functions organized by category. Each utility is thoroughly tested and documented.

### Array Utilities

#### `array/group-by`

Groups the elements of an array based on the result of a callback function.

```typescript
import { groupBy } from './lib/utils/array-group-by';

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
import { unique } from './lib/utils/array-unique';

const numbers = [1, 2, 2, 3, 1, 4];
const uniqueNumbers = unique(numbers);
// Result: [1, 2, 3, 4]
```

#### `array/chunk`

Splits an array into chunks of a specified size.

```typescript
import { chunk } from './lib/utils/array-chunk';

const numbers = [1, 2, 3, 4, 5, 6, 7];
const chunks = chunk(numbers, 3);
// Result: [[1, 2, 3], [4, 5, 6], [7]]
```

#### `array/flatten`

Flattens nested arrays to a specified depth.

```typescript
import { flatten } from './lib/utils/array-flatten';

const nested = [1, [2, 3], [4, [5, 6]]];
const flat = flatten(nested);
// Result: [1, 2, 3, 4, [5, 6]]

const deepFlat = flatten(nested, Infinity);
// Result: [1, 2, 3, 4, 5, 6]
```

#### `array/intersection`

Finds the intersection of two or more arrays.

```typescript
import { intersection } from './lib/utils/array-intersection';

const arr1 = [1, 2, 3, 4];
const arr2 = [2, 3, 4, 5];
const common = intersection(arr1, arr2);
// Result: [2, 3, 4]
```

#### `array/compact`

Removes falsy values from an array.

```typescript
import { compact } from './lib/utils/array-compact';

const mixed = [0, 1, false, 2, '', 3, null, 4, undefined, 5, NaN];
const clean = compact(mixed);
// Result: [1, 2, 3, 4, 5]
```

### Boolean Utilities

#### `boolean/is-falsy`

Checks if a value is falsy (false, 0, "", null, undefined, NaN).

```typescript
import { isFalsy } from './lib/utils/boolean-is-falsy';

isFalsy(''); // true
isFalsy(0); // true
isFalsy('hello'); // false
```

#### `boolean/is-truthy`

Checks if a value is truthy (anything that is not falsy).

```typescript
import { isTruthy } from './lib/utils/boolean-is-truthy';

isTruthy('hello'); // true
isTruthy([]); // true
isTruthy(0); // false
```

### Function Utilities

#### `function/debounce`

Creates a debounced function that delays invoking until after wait milliseconds have elapsed.

```typescript
import { debounce } from './lib/utils/function-debounce';

const handleSearch = (query: string) => console.log('Searching:', query);
const debouncedSearch = debounce(handleSearch, 300);

debouncedSearch('a'); // Canceled
debouncedSearch('ap'); // Canceled
debouncedSearch('app'); // Executes after 300ms
```

### JSON Utilities

#### `json/safe-parse`

Safely parses a JSON string, returning undefined if parsing fails.

```typescript
import { safeParse } from './lib/utils/json-safe-parse';

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
import { pick } from './lib/utils/object-pick';

const user = { id: 1, name: 'John', email: 'john@example.com', age: 30 };
const publicInfo = pick(user, ['id', 'name']);
// Result: { id: 1, name: 'John' }
```

### Promise Utilities

#### `promise/delay`

Returns a promise that resolves after a given number of milliseconds.

```typescript
import { delay } from './lib/utils/promise-delay';

// Simple delay
await delay(1000); // Wait 1 second
console.log('This runs after 1 second');

// Rate limiting
for (const item of items) {
  await processItem(item);
  await delay(100); // 100ms between each item
}
```

### String Utilities

#### `string/capitalize`

Capitalizes the first letter of a string while leaving the rest unchanged.

```typescript
import { capitalize } from './lib/utils/string-capitalize';

capitalize('hello world'); // 'Hello world'
capitalize('javaScript'); // 'JavaScript'
capitalize(''); // ''
```

### URL Utilities

#### `url/parse-url`

Parses a URL string into its component parts.

```typescript
import { parseUrl } from './lib/utils/url-parse-url';

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
import { buildQuery } from './lib/utils/url-build-query';

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
import { isValidUrl } from './lib/utils/url-is-valid-url';

isValidUrl('https://example.com'); // true
isValidUrl('not-a-url'); // false
isValidUrl('https://example.com', { protocols: ['https'] }); // true
isValidUrl('example.com', { requireProtocol: false }); // true
```

#### `url/sanitize-url`

Sanitizes a URL by removing or encoding potentially dangerous elements.

```typescript
import { sanitizeUrl } from './lib/utils/url-sanitize-url';

sanitizeUrl('https://example.com/path?query=value');
// 'https://example.com/path?query=value'

sanitizeUrl('javascript:alert("xss")'); // null
sanitizeUrl('//example.com/path', { defaultProtocol: 'https' });
// 'https://example.com/path'
```

---

## CLI Commands

### `init`

The `init` command sets up your project by creating a `shards.json` configuration file.

```bash
npx fragmen init
```

### `add <name>`

The `add` command copies a fragment from the registry into your project.

```bash
npx fragmen add <fragment-name>
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
