import { getAllRegistryItems } from '@/lib/registry';
import { FavoritesClient } from './favorites-client';

export const metadata = {
  title: 'Your Favorites | Fragmen',
  description: 'View your favorite utilities',
};

export default function FavoritesPage() {
  const allItems = getAllRegistryItems();

  return <FavoritesClient allItems={allItems} />;
}
