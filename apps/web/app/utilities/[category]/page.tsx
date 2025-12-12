import { BackToTop } from '@/components/back-to-top';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from '@/components/favorite-button';
import { UTILITY_STATUS, STATUS_VARIANTS } from '@/config/utility-status';
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
        <div className="container mx-auto px-6 py-10">
          <Link
            href="/utilities"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to all utilities
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            {categoryName} Utilities
          </h1>
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
                    ({categories.reduce((acc, cat) => acc + getItemsByCategory(cat).length, 0)})
                  </span>
                </Link>
                {categories.map(cat => {
                  const count = getItemsByCategory(cat).length;
                  const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
                  return (
                    <Link
                      key={cat}
                      href={`/utilities/${cat}`}
                      prefetch={true}
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                        cat === category
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                      }`}
                    >
                      {cat}
                      <span className="ml-1 text-xs">({count})</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {sortedItems.map(item => (
            <Link
              key={item.slug}
              href={`/utilities/${item.slug}`}
              className="group block rounded-lg border border-border/60 bg-background p-5 transition-colors hover:bg-secondary/40"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    {item.category}
                  </span>
                  {UTILITY_STATUS[item.slug as keyof typeof UTILITY_STATUS] && (
                    <Badge variant={STATUS_VARIANTS[UTILITY_STATUS[item.slug as keyof typeof UTILITY_STATUS]]}>
                      {UTILITY_STATUS[item.slug as keyof typeof UTILITY_STATUS]}
                    </Badge>
                  )}
                </div>
                <FavoriteButton slug={item.slug} />
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
          </div>
        </div>
      </div>

      <BackToTop />
    </main>
  );
}
