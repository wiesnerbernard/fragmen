'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RequestsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    
    // In a real app, this would send to an API
    console.log('Request submitted:', { title, description, category });
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    e.currentTarget.reset();
  };

  return (
    <main className="min-h-screen">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Request a Utility</h1>
          <p className="text-lg text-muted-foreground">
            Have an idea for a utility function? Let us know what you'd like to see added to Fragmen.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {submitted && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 p-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Thanks for your request! We'll review it and consider adding it to Fragmen.
                </p>
              </div>
            </div>
          )}

          {/* Request Form */}
          <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Utility Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g., throttle, deep-clone, parse-csv"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  What would you like to call this utility?
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe what the utility should do, any specific features or options it should have, and why it would be useful..."
                  rows={6}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  required
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Be as specific as possible about the functionality and use cases.
                </p>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select a category...</option>
                  <option value="array">Array</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                  <option value="function">Function</option>
                  <option value="json">JSON</option>
                  <option value="number">Number</option>
                  <option value="object">Object</option>
                  <option value="promise">Promise</option>
                  <option value="string">String</option>
                  <option value="url">URL</option>
                  <option value="validation">Validation</option>
                  <option value="other">Other</option>
                </select>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Which category would this utility belong to?
                </p>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* GitHub Alternative */}
          <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-6">
            <h3 className="text-sm font-semibold mb-2">Prefer GitHub?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You can also submit utility requests directly as GitHub issues where you can track progress and join the discussion.
            </p>
            <a
              href="https://github.com/wiesnerbernard/fragmen/issues/new?labels=utility-request&template=utility-request.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Create a GitHub issue
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
