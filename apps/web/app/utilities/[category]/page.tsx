import { BackToTop } from '@/components/back-to-top';
import {
  getCategories,
  getItemsByCategory,
  getRegistryItem,
} from '@/lib/registry';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    category: string;
  };
  searchParams: {
    sort?: 'name' | 'date';
  };
}

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

export default function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = params;
  const sort = searchParams.sort || 'name';

  const categories = getCategories();
  if (!categories.includes(category)) {
    notFound();
  }

  const itemNames = getItemsByCategory(category);
  const items = itemNames
    .map(name => getRegistryItem(category, name))
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Sort utilities
  const sortedItems = [...items].sort((a, b) => {
    if (sort === 'date') {
      return (b.since || '').localeCompare(a.since || '');
    }
    return a.name.localeCompare(b.name);
  });

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <Link
            href="/utilities"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to all utilities
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {categoryName} Utilities
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {items.length} {items.length === 1 ? 'utility' : 'utilities'} in
            this category
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Sort Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <Link
              href={`/utilities/${category}?sort=name`}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                sort === 'name'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/60 hover:bg-secondary text-foreground'
              }`}
            >
              Name
            </Link>
            <Link
              href={`/utilities/${category}?sort=date`}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                sort === 'date'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/60 hover:bg-secondary text-foreground'
              }`}
            >
              Date Added
            </Link>
          </div>
        </div>

        {/* Utilities Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedItems.map(item => (
            <Link
              key={item.slug}
              href={`/utilities/${item.slug}`}
              className="group block rounded-lg border border-border bg-background p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                  {item.name}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.description}
              </p>
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
              {item.since && (
                <div className="text-xs text-muted-foreground">
                  Added {item.since}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Other Categories */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Other Categories</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories
              .filter(cat => cat !== category)
              .map(cat => {
                const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
                const catItems = getItemsByCategory(cat);
                return (
                  <Link
                    key={cat}
                    href={`/utilities/${cat}`}
                    className="block rounded-lg border border-border bg-background p-4 hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="font-semibold mb-1">{catName}</div>
                    <div className="text-sm text-muted-foreground">
                      {catItems.length}{' '}
                      {catItems.length === 1 ? 'utility' : 'utilities'}
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      </div>

      <BackToTop />
    </main>
  );
}
