'use client';

import { CopyButton } from '@/components/copy-button';

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to use Fragmen in your project
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-3xl">

          <div className="prose dark:prose-invert prose-pre:bg-secondary/40 prose-pre:rounded-lg prose-pre:border prose-pre:border-border/60 prose-pre:px-4 prose-pre:py-3 max-w-none prose-p:text-foreground/80 dark:prose-p:text-foreground/90">
            <h2>Getting Started</h2>
            <p>
              Fragmen is a utility library that copies code fragments directly
              into your project. No dependencies, no bloat - just pure
              TypeScript utilities you can own and customize.
            </p>

            <h2>Installation</h2>
            <p>Initialize Fragmen in your project:</p>
            <div className="relative">
              <pre>
                <code>npx fragmen init</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text="npx fragmen init" />
              </div>
            </div>

            <h2>Commands</h2>

            <h3>List Utilities</h3>
            <p>View all available utilities:</p>
            <div className="relative">
              <pre>
                <code>npx fragmen list</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text="npx fragmen list" />
              </div>
            </div>
            <p>Filter by category:</p>
            <div className="relative">
              <pre>
                <code>npx fragmen list promise</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text="npx fragmen list promise" />
              </div>
            </div>

            <h3>Add Utilities</h3>
            <p>Add a single utility:</p>
            <div className="relative">
              <pre>
                <code>npx fragmen add promise/delay</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text="npx fragmen add promise/delay" />
              </div>
            </div>
            <p>Add multiple utilities at once:</p>
            <div className="relative">
              <pre>
                <code>
                  npx fragmen add promise/delay string/capitalize array/chunk
                </code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text="npx fragmen add promise/delay string/capitalize array/chunk" />
              </div>
            </div>

            <h3>Show Utility</h3>
            <p>Preview a utility before adding it:</p>
            <div className="relative">
              <pre>
                <code>npx fragmen show promise/delay</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text="npx fragmen show promise/delay" />
              </div>
            </div>

            <h3>Browse</h3>
            <p>Interactive browser to explore and select utilities:</p>
            <div className="relative">
              <pre>
                <code>npx fragmen browse</code>
              </pre>
              <div className="absolute top-2 right-2">
                <CopyButton text="npx fragmen browse" />
              </div>
            </div>

            <h2>Categories</h2>
            <ul>
              <li>
                <strong>array</strong> - Array manipulation utilities
              </li>
              <li>
                <strong>boolean</strong> - Boolean helpers
              </li>
              <li>
                <strong>date</strong> - Date and time utilities
              </li>
              <li>
                <strong>function</strong> - Function utilities
              </li>
              <li>
                <strong>json</strong> - JSON parsing and validation
              </li>
              <li>
                <strong>number</strong> - Number formatting and manipulation
              </li>
              <li>
                <strong>object</strong> - Object manipulation utilities
              </li>
              <li>
                <strong>promise</strong> - Promise and async utilities
              </li>
              <li>
                <strong>string</strong> - String manipulation and formatting
              </li>
              <li>
                <strong>url</strong> - URL parsing and building
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
