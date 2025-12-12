import { BackToTop } from '@/components/back-to-top';
import {
  getCategories,
  getItemsByCategory,
  getRegistryItem,
} from '@/lib/registry';
import { notFound } from 'next/navigation';
import { CategoryPageClient } from './category-page-client';

interface PageProps {
  params: {
    category: string;
  };
}

// Force static generation at build time
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map(category => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = params;
  const categories = getCategories();

  if (!categories.includes(category)) {
    return {};
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${categoryName} Utilities | Fragmen`,
    description: `Browse all ${category} utilities in Fragmen - a curated collection of TypeScript utility functions.`,
    keywords: [category, 'utilities', 'typescript', 'functions'],
    openGraph: {
      title: `${categoryName} Utilities`,
      description: `Browse all ${category} utilities in Fragmen`,
      type: 'website',
      url: `https://fragmen.vercel.app/utilities/${category}`,
    },
  };
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = params;

  const categories = getCategories();
  if (!categories.includes(category)) {
    notFound();
  }

  const itemNames = getItemsByCategory(category);
  const items = itemNames
    .map(name => getRegistryItem(category, name))
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical sort

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  // Compute category counts for client component
  const categoriesWithCounts = categories.map(cat => ({
    name: cat,
    count: getItemsByCategory(cat).length,
  }));

  const totalCount = categoriesWithCounts.reduce(
    (acc, cat) => acc + cat.count,
    0
  );

  return (
    <>
      <CategoryPageClient
        category={category}
        categoryName={categoryName}
        items={items}
        categories={categoriesWithCounts}
        totalCount={totalCount}
      />
      <BackToTop />
    </>
  );
}
