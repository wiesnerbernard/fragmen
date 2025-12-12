import { BackToTop } from '@/components/back-to-top';
import { CopyButton } from '@/components/copy-button';
import { FavoriteButton } from '@/components/favorite-button';
import { QuickActions } from '@/components/quick-actions';
import {
  getAllRegistryItems,
  getCategories,
  getItemsByCategory,
  getRegistryItem,
} from '@/lib/registry';
import { findRelatedUtilities } from '@/lib/related';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { codeToHtml } from 'shiki';

interface PageProps {
  params: {
    category: string;
    name: string;
  };
}

export async function generateStaticParams() {
  const categories = getCategories();
  const params: Array<{ category: string; name: string }> = [];

  for (const category of categories) {
    const items = getItemsByCategory(category);
    for (const item of items) {
      params.push({ category, name: item });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { category, name } = params;
  const item = getRegistryItem(category, name);

  if (!item) {
    return {};
  }

  return {
    title: `${item.name} - ${item.category} utility | Fragmen`,
    description: item.description,
    keywords: [item.name, item.category, ...item.tags, 'typescript', 'utility'],
    openGraph: {
      title: `${item.name} - ${item.category} utility`,
      description: item.description,
      type: 'article',
      url: `https://fragmen.vercel.app/utilities/${item.slug}`,
    },
  };
}

export default async function UtilityPage({ params }: PageProps) {
  const { category, name } = params;
  const item = getRegistryItem(category, name);

  if (!item) {
    notFound();
  }

  const allItems = getAllRegistryItems();
  const relatedUtilities = findRelatedUtilities(item, allItems, 6);

  // Render code with syntax highlighting using dual theme for proper light/dark switching
  const highlightedCode = await codeToHtml(item.code, {
    lang: 'typescript',
    themes: {
      light: 'min-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <Link
            href="/utilities"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to utilities
          </Link>
          <div className="mb-2">
            <span className="inline-flex items-center rounded-full bg-secondary/80 px-3 py-1 text-sm font-medium text-secondary-foreground">
              {item.category}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {item.name}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                {item.description}
              </p>
            </div>
            <FavoriteButton slug={item.slug} className="flex-shrink-0" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Installation */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Installation
              </h2>
              <div className="rounded-lg bg-secondary/40 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ring-1 ring-border/60">
                <code className="text-xs sm:text-sm break-all">
                  npx fragmen add {item.slug}
                </code>
                <CopyButton text={`npx fragmen add ${item.slug}`} />
              </div>
            </section>

            {/* Code */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Source Code</h2>
                <CopyButton text={item.code} />
              </div>
              <div className="relative rounded-xl overflow-hidden ring-1 ring-border/60 shadow-lg">
                {/* Theme-aware syntax highlighted code with dual theme support */}
                <div
                  className="overflow-x-auto [&>pre]:!m-0 [&>pre]:!rounded-none [&>pre]:!p-6"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </div>
            </section>

            {/* Examples */}
            {item.examples.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Examples</h2>
                <div className="space-y-4">
                  {item.examples.map((example, index) => {
                    const codeBlock = example.match(/```[\s\S]*?```/)?.[0];
                    const cleanCode = codeBlock
                      ? codeBlock
                          .replace(/```(?:typescript|ts)?\n?/, '')
                          .replace(/```$/, '')
                      : example;

                    return (
                      <div
                        key={index}
                        className="group relative rounded-xl overflow-hidden ring-1 ring-border/60 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <CopyButton text={cleanCode} />
                        </div>
                        <pre className="p-6 overflow-x-auto bg-secondary/20 dark:bg-secondary/10 text-sm leading-relaxed">
                          <code>{cleanCode}</code>
                        </pre>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Related Utilities */}
            {relatedUtilities.length > 0 && (
              <section className="pt-8 border-t border-border">
                <h2 className="text-2xl font-bold mb-4">Related Utilities</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedUtilities.map(related => (
                    <Link
                      key={related.slug}
                      href={`/utilities/${related.slug}`}
                      className="group rounded-lg border border-border bg-background p-4 hover:shadow-md hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {related.name}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded">
                          {related.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {related.description}
                      </p>
                      {related.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {related.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="text-xs text-muted-foreground"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions code={item.code} slug={item.slug} name={item.name} />

            {/* Tags */}
            {item.tags.length > 0 && (
              <section className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/utilities?tag=${tag}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-secondary/60 hover:bg-secondary transition-colors"
                    >
                      <span className="text-primary">#</span>
                      {tag}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Parameters */}
            {item.params.length > 0 && (
              <section className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                  Parameters
                </h3>
                <div className="space-y-3">
                  {item.params.map((param, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <code className="text-sm font-medium text-primary">
                          {param.name}
                        </code>
                        <code className="text-xs text-muted-foreground bg-secondary/40 px-2 py-0.5 rounded font-mono">
                          {param.type}
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {param.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Returns */}
            {item.returns.type && (
              <section className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                  Returns
                </h3>
                <code className="text-xs text-muted-foreground bg-secondary/40 px-2 py-1 rounded font-mono block mb-2 break-all">
                  {item.returns.type}
                </code>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.returns.description}
                </p>
              </section>
            )}

            {/* Meta Information */}
            {item.since && (
              <section className="rounded-lg border border-border bg-background p-4 shadow-sm">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                  Information
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Added</span>
                    <span className="font-medium">{item.since}</span>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <BackToTop />
    </main>
  );
}
