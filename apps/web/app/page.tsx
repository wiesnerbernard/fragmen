'use client'

import Link from 'next/link'
import { CopyButton } from '@/components/copy-button'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6">
            Fragmen
          </h1>
          <p className="text-xl text-muted-foreground mb-8 md:text-2xl">
            A utility library to copy code fragments into your project
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Browse 50+ high-quality TypeScript utilities across 9 categories. 
            Copy the code directly into your project - no dependencies required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/utilities"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Browse Utilities
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-secondary"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-lg font-semibold mb-2">Own Your Code</h3>
              <p className="text-muted-foreground text-sm">
                Utilities are copied directly into your codebase. Full control to inspect, adapt, and learn from them.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-lg font-semibold mb-2">Zero Dependencies</h3>
              <p className="text-muted-foreground text-sm">
                Each fragment is self-contained. Adding a utility doesn&apos;t bloat your node_modules folder.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-lg font-semibold mb-2">TypeScript First</h3>
              <p className="text-muted-foreground text-sm">
                All fragments are written in TypeScript with excellent type safety and JSDoc annotations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Start</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Initialize</h3>
                  <div className="relative">
                    <pre className="rounded bg-secondary p-3 text-sm overflow-x-auto">
                      <code>npx fragmen init</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <CopyButton text="npx fragmen init" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Browse Utilities</h3>
                  <div className="relative">
                    <pre className="rounded bg-secondary p-3 text-sm overflow-x-auto">
                      <code>npx fragmen browse</code>
                    </pre>
                    <div className="absolute top-2 right-2">
                      <CopyButton text="npx fragmen browse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Add to Your Project</h3>
                  <div className="relative">
                    <pre className="rounded bg-secondary p-3 text-sm overflow-x-auto">
                      <code>npx fragmen add promise/delay string/capitalize</code>
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
  )
}
