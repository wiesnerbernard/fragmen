'use client';

import { BackToTop } from '@/components/back-to-top';
import { UtilityCard } from '@/components/utility-card';
import type { RegistryItem } from '@/lib/registry';
import { useFavorites } from '@/lib/use-favorites';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FavoritesClientProps {
  allItems: RegistryItem[];
}

export function FavoritesClient({ allItems }: FavoritesClientProps) {
  const { favorites, isLoaded } = useFavorites();
  const [favoriteItems, setFavoriteItems] = useState<RegistryItem[]>([]);

  useEffect(() => {
    if (isLoaded) {
      const items = allItems.filter(item => favorites.includes(item.slug));
      setFavoriteItems(items);
    }
  }, [favorites, isLoaded, allItems]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen">
        <div className="border-b border-border bg-background">
          <div className="container mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-4">Your Favorites</h1>
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-10">
          <Link
            href="/utilities"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to utilities
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-8 h-8 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <h1 className="text-4xl font-bold">Your Favorites</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {favoriteItems.length === 0 ? (
              <>No favorites yet. Star utilities to save them here!</>
            ) : (
              <>
                {favoriteItems.length}{' '}
                {favoriteItems.length === 1 ? 'utility' : 'utilities'} saved
              </>
            )}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {favoriteItems.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start building your collection by starring utilities you use
              frequently
            </p>
            <Link
              href="/utilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse Utilities
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
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
            {favoriteItems.map(item => (
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
        )}
      </div>

      <BackToTop />
    </main>
  );
}
