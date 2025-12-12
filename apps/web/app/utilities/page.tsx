import { getAllRegistryItems, getCategories } from '@/lib/registry';
import Link from 'next/link';
import { Suspense } from 'react';
import { UtilitiesClient } from './utilities-client';

export default function UtilitiesPage() {
  const items = getAllRegistryItems();
  const categories = getCategories();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UtilitiesClient items={items} categories={categories} />
    </Suspense>
  );
}
