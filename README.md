# Fragmen 🧩

**"ShadCN but for helper functions."**

Fragmen is a CLI tool that lets you add high-quality, standalone TypeScript utility functions directly into your project. Instead of adding another dependency to your `package.json`, you get the source code. You own it, you can change it, and you won't have to worry about bundle size or breaking changes from a third-party library.

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
└── lib/
    └── utils/
        └── string/
            └── capitalize.ts   <-- Your new fragment!
```

Now you can import it and use it anywhere in your project:

```typescript
import { capitalize } from '@/lib/utils/string/capitalize';

console.log(capitalize('hello world')); // "Hello world"
```

---

## Available Fragments

This is the initial set of available fragments. The registry will grow over time.

- `string/capitalize`: Capitalizes the first letter of a string.
- `array/groupBy`: Groups an array of objects by a key.
- `array/unique`: Returns an array with only unique values.
- `object/pick`: Creates an object with a subset of keys.
- `function/debounce`: Delays function execution.
- `json/safeParse`: Parses JSON without throwing an error.
- `promise/delay`: A promise-based `setTimeout`.

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

## Contributing

This project is open-source and contributions are welcome! Feel free to open an issue to suggest a new fragment or submit a pull request to add one.

## License

Licensed under the **MIT License**.
