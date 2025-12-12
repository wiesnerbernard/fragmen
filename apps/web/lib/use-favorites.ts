'use client';

import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'fragmen-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch {
          setFavorites([]);
        }
      }
    };

    loadFavorites();
    setIsLoaded(true);

    // Listen for changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY && e.newValue) {
        try {
          setFavorites(JSON.parse(e.newValue));
        } catch {
          setFavorites([]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleFavorite = (slug: string) => {
    // Read latest state from localStorage to avoid race conditions
    const stored = localStorage.getItem(FAVORITES_KEY);
    const currentFavorites = stored ? JSON.parse(stored) : [];

    const newFavorites = currentFavorites.includes(slug)
      ? currentFavorites.filter((s: string) => s !== slug)
      : [...currentFavorites, slug];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const isFavorite = (slug: string) => favorites.includes(slug);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
