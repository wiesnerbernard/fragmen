'use client';

import { UtilityCard } from '@/components/utility-card';
import type { RegistryItem } from '@/lib/registry';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CategoryPageClientProps {
  category: string;
  categoryName: string;
  items: RegistryItem[];
  categories: Array<{ name: string; count: number }>;
  totalCount: number;
}

export function CategoryPageClient({
  category,
  categoryName,
  items,
  categories,
  totalCount,
}: CategoryPageClientProps) {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-10">
          <Link
            href="/utilities"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to all utilities
          </Link>
          <h1 className="text-4xl font-bold mb-4">{categoryName} Utilities</h1>
          <p className="text-lg text-muted-foreground">
            {items.length} {items.length === 1 ? 'utility' : 'utilities'} in
            this category
          </p>
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
                    ({totalCount})
                  </span>
                </Link>
                {categories.map(cat => {
                  return (
                    <Link
                      key={cat.name}
                      href={`/utilities/${cat.name}`}
                      prefetch={true}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                        cat.name === category
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                      }`}
                    >
                      {cat.name}
                      <span className="ml-1 text-xs">({cat.count})</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Utilities Grid */}
            <motion.div
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {items.map(item => (
                <motion.div
                  key={item.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <UtilityCard item={item} showCategory={true} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
