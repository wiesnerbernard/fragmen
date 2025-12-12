import { BackToTop } from '@/components/back-to-top';
import { UtilityCard } from '@/components/utility-card';
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
                    (
                    {categories.reduce(
                      (acc, cat) => acc + getItemsByCategory(cat).length,
                      0
                    )}
                    )
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
            {/* Utilities Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {items.map(item => (
                <UtilityCard key={item.slug} item={item} showCategory={true} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </main>
  );
}
