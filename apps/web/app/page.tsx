'use client';

import { CopyButton } from '@/components/copy-button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 via-background to-background dark:from-secondary/10" />
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6">
              Fragmen
            </h1>
            <p className="text-xl text-muted-foreground mb-8 md:text-2xl">
              Copy‑paste TypeScript utilities into your project.
            </p>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Browse 50+ focused fragments across 9 categories. Own the code,
              adapt it freely, and ship without extra dependencies.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/utilities"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Browse Utilities
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background px-8 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Documentation
              </Link>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="rounded-lg border border-border/60 bg-background/60 px-4 py-3 text-sm font-mono text-foreground shadow-sm backdrop-blur">
                <code>npx fragmen add promise/delay</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Example Section */}
      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-4 text-center">See It In Action</h2>
            <p className="text-center text-muted-foreground mb-12">
              Real utilities solving real problems. Here&apos;s how a search input works with and without debouncing.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Without Debounce */}
              <div className="rounded-xl bg-background p-6 ring-1 ring-border/60">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <h3 className="font-semibold text-sm">Without Debounce</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Every keystroke triggers an API call
                </p>
                <div className="rounded-lg bg-secondary/40 p-4 font-mono text-xs space-y-2 h-32 overflow-y-auto">
                  <div className="text-muted-foreground">// User types "react"</div>
                  <div className="text-orange-500">API call: "r"</div>
                  <div className="text-orange-500">API call: "re"</div>
                  <div className="text-orange-500">API call: "rea"</div>
                  <div className="text-orange-500">API call: "reac"</div>
                  <div className="text-orange-500">API call: "react"</div>
                  <div className="text-muted-foreground mt-2">💸 5 API calls made</div>
                </div>
              </div>

              {/* With Debounce */}
              <div className="rounded-xl bg-background p-6 ring-1 ring-border/60">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <h3 className="font-semibold text-sm">With Debounce</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Waits 300ms after typing stops
                </p>
                <div className="rounded-lg bg-secondary/40 p-4 font-mono text-xs space-y-2 h-32 overflow-y-auto">
                  <div className="text-muted-foreground">// User types "react"</div>
                  <div className="text-muted-foreground/50">Waiting...</div>
                  <div className="text-muted-foreground/50">Waiting...</div>
                  <div className="text-muted-foreground/50">Waiting...</div>
                  <div className="text-green-500">API call: "react"</div>
                  <div className="text-muted-foreground mt-2">✅ 1 API call made</div>
                </div>
              </div>
            </div>

            {/* Code Example */}
            <div className="mt-8 rounded-xl bg-background p-6 ring-1 ring-border/60">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Implementation</h3>
                <CopyButton text={`import { debounce } from '@/lib/debounce';

const handleSearch = (query: string) => {
  fetch(\`/api/search?q=\${query}\`);
};

const debouncedSearch = debounce(handleSearch, 300);

// Use in your component
<input onChange={(e) => debouncedSearch(e.target.value)} />`} />
              </div>
              <pre className="rounded-lg bg-secondary/40 p-4 overflow-x-auto text-xs">
                <code>{`import { debounce } from '@/lib/debounce';

const handleSearch = (query: string) => {
  fetch(\`/api/search?q=\${query}\`);
};

const debouncedSearch = debounce(handleSearch, 300);

// Use in your component
<input onChange={(e) => debouncedSearch(e.target.value)} />`}</code>
              </pre>
              <div className="mt-4 pt-4 border-t border-border/60">
                <Link
                  href="/utilities/function/debounce"
                  className="text-sm text-primary hover:underline"
                >
                  View full debounce utility →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/60">
        <div className="container mx-auto px-6 py-20">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-base font-semibold mb-2">Own Your Code</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilities are copied into your codebase so you can inspect,
                adapt, and learn from them.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">
                Zero Dependencies
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each fragment is self‑contained. Adding a utility won&apos;t
                bloat your project.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2">
                TypeScript First
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Written in TypeScript with strong types and clear JSDoc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-10 text-center">Quick Start</h2>

          <div className="space-y-5">
            <div className="rounded-xl bg-secondary/40 p-6 ring-1 ring-border/60">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Initialize</h3>
                  <div className="relative">
                    <pre className="rounded-md bg-background/80 p-3 text-sm overflow-x-auto">
                      <code>npx fragmen init</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <CopyButton text="npx fragmen init" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-secondary/40 p-6 ring-1 ring-border/60">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Browse Utilities</h3>
                  <div className="relative">
                    <pre className="rounded-md bg-background/80 p-3 text-sm overflow-x-auto">
                      <code>npx fragmen browse</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <CopyButton text="npx fragmen browse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-secondary/40 p-6 ring-1 ring-border/60">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Add to Your Project</h3>
                  <div className="relative">
                    <pre className="rounded-md bg-background/80 p-3 text-sm overflow-x-auto">
                      <code>
                        npx fragmen add promise/delay string/capitalize
                      </code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <CopyButton text="npx fragmen add promise/delay string/capitalize" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
