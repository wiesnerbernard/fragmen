'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { RegistryItem } from '@/lib/registry'

interface UtilitiesClientProps {
  items: RegistryItem[]
  categories: string[]
}

export function UtilitiesClient({ items, categories }: UtilitiesClientProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  // Extract all unique tags from items
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    items.forEach(item => {
      item.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [items])

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'description', weight: 1.5 },
        { name: 'category', weight: 1 },
        { name: 'tags', weight: 1.2 }
      ],
      threshold: 0.4,
      includeScore: true,
    })
  }, [items])

  const filteredItems = useMemo(() => {
    let results = items

    // Apply fuzzy search if there's a search query
    if (search.trim() !== '') {
      const fuseResults = fuse.search(search)
      results = fuseResults.map(result => result.item)
    }

    // Apply category and tag filters
    return results.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesTag = selectedTag === 'all' || item.tags?.includes(selectedTag)
      return matchesCategory && matchesTag
    })
  }, [items, search, selectedCategory, selectedTag, fuse])

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Utilities</h1>
          <p className="text-lg text-muted-foreground">
            Browse {items.length} high-quality TypeScript utilities across {categories.length} categories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search utilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              All ({items.length})
            </button>
            {categories.map(category => {
              const count = items.filter(item => item.category === category).length
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Filter by tag:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('all')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    selectedTag === 'all'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => {
                  const count = items.filter(item => item.tags?.includes(tag)).length
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        selectedTag === tag
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {tag} ({count})
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredItems.length} {filteredItems.length === 1 ? 'utility' : 'utilities'} found
        </p>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => (
            <Link
              key={item.slug}
              href={`/utilities/${item.slug}`}
              className="group block rounded-lg border border-border bg-background p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block rounded bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                  {item.category}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">
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
                      className="inline-block rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
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
            <p className="text-lg text-muted-foreground">No utilities found matching your search.</p>
          </div>
        )}
      </div>
    </main>
  )
}
