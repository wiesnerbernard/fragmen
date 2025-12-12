'use client';

import type { RegistryItem } from '@/lib/registry';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

interface UtilitiesClientProps {
  items: RegistryItem[];
  categories: string[];
}

export function UtilitiesClient({ items, categories }: UtilitiesClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

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
          <p className="text-lg text-muted-foreground">
            Browse {items.length} high-quality TypeScript utilities across{' '}
            {categories.length} categories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search utilities... (⌘K)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-secondary/60 text-sm text-foreground placeholder:text-muted-foreground shadow-sm ring-1 ring-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background"
              />
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 rounded-full bg-secondary/60 text-sm text-foreground hover:bg-secondary transition-colors whitespace-nowrap ring-1 ring-border/60"
                title="Clear all filters (Esc)"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ring-1 ring-border/60 ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
              }`}
            >
              All ({items.length})
            </button>
            {categories.map(category => {
              const count = items.filter(
                item => item.category === category
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ring-1 ring-border/60 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Filter by tag:
              </p>
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
            <Link
              key={item.slug}
              href={`/utilities/${item.slug}`}
              className="group block rounded-lg border border-border/60 bg-background p-5 transition-colors hover:bg-secondary/40"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                  {item.category}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold group-hover:text-foreground transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {item.description || 'No description available'}
              </p>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
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
    </main>
  );
}
