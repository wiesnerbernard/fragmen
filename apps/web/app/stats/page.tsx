'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { analytics } from '@/lib/analytics';

interface PopularUtility {
  utility: string;
  count: number;
}

export default function StatsPage() {
  const [popular, setPopular] = useState<PopularUtility[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPopular(analytics.getPopularUtilities(20));
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen">
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              ← Back to home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Usage Statistics
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Loading your local analytics data...
            </p>
          </div>
        </div>
      </main>
    );
  }

  const totalInteractions = popular.reduce((sum, item) => sum + item.count, 0);

  return (
    <main className="min-h-screen">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Usage Statistics
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-4">
            Track your most-used utilities based on your browsing history
          </p>
          <p className="text-sm text-muted-foreground">
            📊 Total interactions: <span className="font-semibold">{totalInteractions}</span> • 
            Stored locally in your browser
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {popular.length === 0 ? (
            <div className="text-center py-12 rounded-lg border border-border bg-secondary/20">
              <p className="text-muted-foreground mb-4">
                No usage data yet. Start browsing utilities to see your statistics!
              </p>
              <Link
                href="/utilities"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Browse Utilities
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Most Popular Utilities</h2>
                <div className="space-y-3">
                  {popular.map((item, index) => {
                    const percentage = ((item.count / totalInteractions) * 100).toFixed(1);
                    const [category, name] = item.utility.split('/');
                    
                    return (
                      <div
                        key={item.utility}
                        className="rounded-lg border border-border bg-background p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                              {index + 1}
                            </span>
                            <Link
                              href={`/utilities/${item.utility}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {name}
                            </Link>
                            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary">
                              {category}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{item.count}</div>
                            <div className="text-xs text-muted-foreground">
                              {percentage}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg border border-border bg-secondary/20">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This data is stored locally in your browser and is not shared with anyone. 
                  It tracks your views, copies, and install command clicks to help you see which utilities you use most.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all analytics data?')) {
                      analytics.clear();
                      setPopular([]);
                    }
                  }}
                  className="mt-3 text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Clear all data
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
