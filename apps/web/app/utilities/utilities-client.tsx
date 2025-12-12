'use client';

import { UtilityCard } from '@/components/utility-card';
import type { RegistryItem } from '@/lib/registry';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

interface UtilitiesClientProps {
  items: RegistryItem[];
  categories: string[];
}

export function UtilitiesClient({ items, categories }: UtilitiesClientProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Read tag from URL on mount
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
  }, [searchParams]);

  // Extract all unique tags from items
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach(item => {
      item.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [items]);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'category', weight: 1 },
        { name: 'tags', weight: 1.2 },
      ],
      threshold: 0.4,
      includeScore: true,
    });
  }, [items]);

  const filteredItems = useMemo(() => {
    let results = items;

    // Apply fuzzy search if there's a search query
    if (search.trim() !== '') {
      const fuseResults = fuse.search(search);
      results = fuseResults.map(result => result.item);
    }

    // Apply category and tag filters
    return results.filter(item => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesTag =
        selectedTag === 'all' || item.tags?.includes(selectedTag);
      return matchesCategory && matchesTag;
    });
  }, [items, search, selectedCategory, selectedTag, fuse]);

  const hasActiveFilters =
    search !== '' || selectedCategory !== 'all' || selectedTag !== 'all';

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedTag('all');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Escape to clear filters
      if (e.key === 'Escape' && hasActiveFilters) {
        clearFilters();
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasActiveFilters]);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold mb-4">Utilities</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Browse {items.length} high-quality TypeScript utilities across{' '}
            {categories.length} categories
          </p>
          {/* Keyboard shortcuts hint */}
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded bg-secondary border border-border font-mono">
                ⌘K
              </kbd>
              <span>Focus search</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-2 py-0.5 rounded bg-secondary border border-border font-mono">
                Esc
              </kbd>
              <span>Clear filters</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-sm font-semibold text-foreground mb-3">
                Categories
              </h2>
              <nav className="space-y-1">
                <Link
                  href="/utilities"
                  prefetch={true}
                  className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary/60 text-foreground"
                >
                  All Utilities
                  <span className="ml-auto text-muted-foreground text-xs">
                    {' '}
                    ({items.length})
                  </span>
                </Link>
                {categories.map(category => {
                  const count = items.filter(
                    item => item.category === category
                  ).length;
                  return (
                    <Link
                      key={category}
                      href={`/utilities/${category}`}
                      prefetch={true}
                      className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary/60 text-muted-foreground hover:text-foreground capitalize"
                    >
                      {category}
                      <span className="ml-1 text-xs">({count})</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search utilities by name, description, or tags..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/40 text-sm text-foreground placeholder:text-muted-foreground shadow-sm ring-1 ring-border/60 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-md transition-colors"
                      aria-label="Clear search"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-5 py-3 rounded-xl bg-secondary/60 text-sm font-medium text-foreground hover:bg-secondary transition-colors whitespace-nowrap ring-1 ring-border/60 shadow-sm"
                    title="Clear all filters (Esc)"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {filteredItems.length === items.length ? (
                    <>Showing all {items.length} utilities</>
                  ) : (
                    <>
                      Found {filteredItems.length}{' '}
                      {filteredItems.length === 1 ? 'utility' : 'utilities'}
                      {search && ` matching "${search}"`}
                    </>
                  )}
                </p>
              </div>

              {/* Tag Filters */}
              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ring-1 ring-border/60 ${
                      selectedTag === 'all'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    All
                  </button>
                  {allTags.map(tag => {
                    const count = items.filter(item =>
                      item.tags?.includes(tag)
                    ).length;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ring-1 ring-border/60 ${
                          selectedTag === tag
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {tag} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-4">
              {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'utility' : 'utilities'} found
            </p>

            {/* Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map(item => (
                <UtilityCard key={item.slug} item={item} showCategory={true} />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No utilities found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
