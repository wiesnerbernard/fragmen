'use client';

import { AnimatedCounter } from '@/components/animated-counter';
import { CopyButton } from '@/components/copy-button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/40 via-background to-background dark:from-secondary/10" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Fragmen
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 md:text-2xl px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Copy‑paste TypeScript utilities into your project.
            </motion.p>
            <motion.p
              className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Browse 50+ focused fragments across 9 categories. Own the code,
              adapt it freely, and ship without extra dependencies.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/utilities"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 sm:px-8 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Browse Utilities
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background px-6 sm:px-8 py-3 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  Documentation
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 sm:mt-10 flex justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="rounded-lg border border-border/60 bg-background/60 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-foreground shadow-sm backdrop-blur overflow-x-auto max-w-full">
                <code>npx fragmen add promise/delay</code>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-3xl font-bold mb-1">
                  <AnimatedCounter value={50} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Utilities</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-3xl font-bold mb-1">
                  <AnimatedCounter value={12} />
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-3xl font-bold mb-1">
                  <AnimatedCounter value={100} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Test Coverage
                </div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-3xl font-bold mb-1">
                  <AnimatedCounter value={0} countDown={true} />
                </div>
                <div className="text-sm text-muted-foreground">
                  Dependencies
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Example Section */}
      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-4 text-center">
              See It In Action
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Real utilities solving real problems. Here&apos;s how chunk splits
              an array into smaller pieces.
            </p>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Input */}
              <motion.div
                className="rounded-xl bg-background p-6 ring-1 ring-border/60"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <h3 className="font-semibold text-sm">Input Array</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  A list of 10 items to split
                </p>
                <div className="rounded-lg bg-secondary/40 p-4 font-mono text-xs">
                  <div className="text-muted-foreground mb-2">
                    const items = [
                  </div>
                  <div className="pl-4 space-y-1">
                    <div className="text-foreground">1, 2, 3, 4, 5,</div>
                    <div className="text-foreground">6, 7, 8, 9, 10</div>
                  </div>
                  <div className="text-muted-foreground">]</div>
                  <div className="mt-3 pt-3 border-t border-border/40 text-muted-foreground">
                    Length:{' '}
                    <span className="text-foreground font-semibold">10</span>
                  </div>
                </div>
              </motion.div>

              {/* Output */}
              <motion.div
                className="rounded-xl bg-background p-6 ring-1 ring-border/60"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <h3 className="font-semibold text-sm">chunk(items, 3)</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Split into groups of 3
                </p>
                <div className="rounded-lg bg-secondary/40 p-4 font-mono text-xs">
                  <div className="text-muted-foreground mb-2">Result:</div>
                  <div className="space-y-1">
                    <div className="text-green-500">[1, 2, 3]</div>
                    <div className="text-green-500">[4, 5, 6]</div>
                    <div className="text-green-500">[7, 8, 9]</div>
                    <div className="text-green-500">[10]</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border/40 text-muted-foreground">
                    Chunks:{' '}
                    <span className="text-foreground font-semibold">4</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Code Example */}
            <motion.div
              className="mt-8 rounded-xl bg-background p-6 ring-1 ring-border/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Implementation</h3>
                <CopyButton
                  text={`import { chunk } from '@/lib/chunk';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunks = chunk(items, 3);

console.log(chunks);
// [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

// Perfect for pagination
const paginatedData = chunk(allProducts, 20);
// Display page 1: paginatedData[0]`}
                />
              </div>
              <pre className="rounded-lg bg-secondary/40 p-4 overflow-x-auto text-xs">
                <code>{`import { chunk } from '@/lib/chunk';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunks = chunk(items, 3);

console.log(chunks);
// [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

// Perfect for pagination
const paginatedData = chunk(allProducts, 20);
// Display page 1: paginatedData[0]`}</code>
              </pre>
              <div className="mt-4 pt-4 border-t border-border/60">
                <Link
                  href="/utilities/array/chunk"
                  className="text-sm text-primary hover:underline"
                >
                  View full chunk utility →
                </Link>
              </div>
            </motion.div>
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
              <h3 className="text-base font-semibold mb-2">TypeScript First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Written in TypeScript with strong types and clear JSDoc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Why Fragmen?
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              How Fragmen compares to other approaches
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* npm Packages */}
              <div className="rounded-xl bg-background p-6 ring-1 ring-border/60">
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">npm Packages</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Install full libraries for small utilities
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span className="text-muted-foreground">
                      Large bundle sizes
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span className="text-muted-foreground">
                      Security vulnerabilities
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span className="text-muted-foreground">
                      Breaking changes in updates
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-muted-foreground">
                      Easy to install
                    </span>
                  </div>
                </div>
              </div>

              {/* Stack Overflow */}
              <div className="rounded-xl bg-background p-6 ring-1 ring-border/60">
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Stack Overflow</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    Copy-paste random code snippets
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span className="text-muted-foreground">
                      No TypeScript types
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span className="text-muted-foreground">Untested code</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✕</span>
                    <span className="text-muted-foreground">
                      Inconsistent quality
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-muted-foreground">Free to use</span>
                  </div>
                </div>
              </div>

              {/* Fragmen */}
              <div className="rounded-xl bg-primary/5 p-6 ring-2 ring-primary/50">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Fragmen</h3>
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Best
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Battle-tested, typed utilities you own
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-foreground">Full code ownership</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-foreground">TypeScript first</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-foreground">100% test coverage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-foreground">Zero dependencies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Utilities Section */}
      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Popular Utilities
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Most commonly used utilities to solve everyday problems
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Debounce */}
              <Link
                href="/utilities/function/debounce"
                className="group rounded-xl bg-background p-6 ring-1 ring-border/60 transition-all hover:ring-2 hover:ring-primary/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    function
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Performance
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  debounce
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Delay function execution until after wait time has elapsed
                  since last call. Perfect for search inputs and resize
                  handlers.
                </p>
                <div className="rounded-lg bg-secondary/40 p-3 font-mono text-xs overflow-x-auto">
                  <code className="text-muted-foreground">
                    debounce(fn, 300)
                  </code>
                </div>
              </Link>

              {/* Delay */}
              <Link
                href="/utilities/promise/delay"
                className="group rounded-xl bg-background p-6 ring-1 ring-border/60 transition-all hover:ring-2 hover:ring-primary/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    promise
                  </span>
                  <span className="text-xs text-muted-foreground">Async</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  delay
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Promise-based delay for async operations. Useful for rate
                  limiting, animations, and testing scenarios.
                </p>
                <div className="rounded-lg bg-secondary/40 p-3 font-mono text-xs overflow-x-auto">
                  <code className="text-muted-foreground">
                    await delay(1000)
                  </code>
                </div>
              </Link>

              {/* Clone */}
              <Link
                href="/utilities/object/clone"
                className="group rounded-xl bg-background p-6 ring-1 ring-border/60 transition-all hover:ring-2 hover:ring-primary/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    object
                  </span>
                  <span className="text-xs text-muted-foreground">Data</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  clone
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Deep clone objects and arrays without reference issues.
                  Essential for immutable state management.
                </p>
                <div className="rounded-lg bg-secondary/40 p-3 font-mono text-xs overflow-x-auto">
                  <code className="text-muted-foreground">clone(object)</code>
                </div>
              </Link>

              {/* Chunk */}
              <Link
                href="/utilities/array/chunk"
                className="group rounded-xl bg-background p-6 ring-1 ring-border/60 transition-all hover:ring-2 hover:ring-primary/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    array
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Collections
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  chunk
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Split arrays into smaller chunks of specified size. Great for
                  pagination and batch processing.
                </p>
                <div className="rounded-lg bg-secondary/40 p-3 font-mono text-xs overflow-x-auto">
                  <code className="text-muted-foreground">chunk(array, 3)</code>
                </div>
              </Link>

              {/* Slugify */}
              <Link
                href="/utilities/string/slugify"
                className="group rounded-xl bg-background p-6 ring-1 ring-border/60 transition-all hover:ring-2 hover:ring-primary/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    string
                  </span>
                  <span className="text-xs text-muted-foreground">Text</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  slugify
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Convert strings to URL-friendly slugs. Handles special
                  characters, spaces, and case conversion.
                </p>
                <div className="rounded-lg bg-secondary/40 p-3 font-mono text-xs overflow-x-auto">
                  <code className="text-muted-foreground">
                    slugify(&quot;Hello World&quot;)
                  </code>
                </div>
              </Link>

              {/* Random String */}
              <Link
                href="/utilities/crypto/random-string"
                className="group rounded-xl bg-background p-6 ring-1 ring-border/60 transition-all hover:ring-2 hover:ring-primary/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    crypto
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Security
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  randomString
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  Generate cryptographically secure random strings. Perfect for
                  tokens, IDs, and passwords.
                </p>
                <div className="rounded-lg bg-secondary/40 p-3 font-mono text-xs overflow-x-auto">
                  <code className="text-muted-foreground">
                    randomString(16)
                  </code>
                </div>
              </Link>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/utilities"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Browse All 50+ Utilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border/60 bg-secondary/20">
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Everything you need to know about Fragmen
            </p>

            <div className="space-y-4">
              <details className="group rounded-xl bg-background p-6 ring-1 ring-border/60">
                <summary className="cursor-pointer font-semibold text-base list-none flex items-center justify-between">
                  How is Fragmen different from lodash or other utility
                  libraries?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Unlike traditional npm packages, Fragmen copies utilities
                  directly into your codebase. This means you own the code
                  completely, can modify it freely, and don&apos;t add
                  dependencies to your project. Each utility is self-contained
                  with no external dependencies.
                </p>
              </details>

              <details className="group rounded-xl bg-background p-6 ring-1 ring-border/60">
                <summary className="cursor-pointer font-semibold text-base list-none flex items-center justify-between">
                  Do I need to credit Fragmen in my project?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  No attribution required! Fragmen is MIT licensed. Once you
                  copy a utility, it&apos;s yours to use, modify, and distribute
                  however you like. We only ask that you keep the MIT license
                  notice in the code.
                </p>
              </details>

              <details className="group rounded-xl bg-background p-6 ring-1 ring-border/60">
                <summary className="cursor-pointer font-semibold text-base list-none flex items-center justify-between">
                  Can I modify the utilities after copying them?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Absolutely! That&apos;s the whole point. The code is now part
                  of your project. Adapt it to your specific needs, add
                  features, optimize for your use case, or learn from it. You
                  have complete freedom.
                </p>
              </details>

              <details className="group rounded-xl bg-background p-6 ring-1 ring-border/60">
                <summary className="cursor-pointer font-semibold text-base list-none flex items-center justify-between">
                  How do updates work if I copy code into my project?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Since the code lives in your project, updates are manual. You
                  can check the registry for improvements and copy new versions
                  when needed. This gives you control over when and what to
                  update, avoiding breaking changes.
                </p>
              </details>

              <details className="group rounded-xl bg-background p-6 ring-1 ring-border/60">
                <summary className="cursor-pointer font-semibold text-base list-none flex items-center justify-between">
                  Are the utilities tested?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Yes! Every utility has comprehensive test coverage with
                  multiple test cases. You can view the tests in the registry
                  alongside the source code. Tests are written using Vitest.
                </p>
              </details>

              <details className="group rounded-xl bg-background p-6 ring-1 ring-border/60">
                <summary className="cursor-pointer font-semibold text-base list-none flex items-center justify-between">
                  Can I use Fragmen in commercial projects?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Yes! Fragmen is MIT licensed, which means you can use it
                  freely in both personal and commercial projects without any
                  restrictions or fees.
                </p>
              </details>
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

      {/* Quick Links Section */}
      <section className="border-t border-border/60 bg-secondary/10">
        <div className="container mx-auto px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Explore More
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link
                href="/changelog"
                className="group rounded-lg border border-border bg-background p-6 hover:shadow-md hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    Changelog
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Track new utilities, updates, and improvements
                </p>
              </Link>

              <Link
                href="/requests"
                className="group rounded-lg border border-border bg-background p-6 hover:shadow-md hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    Request a Utility
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vote for or suggest new utilities you'd like to see
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
