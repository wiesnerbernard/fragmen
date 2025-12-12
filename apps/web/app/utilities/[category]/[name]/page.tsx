import { CopyButton } from '@/components/copy-button';
import { BackToTop } from '@/components/back-to-top';
import {
  getCategories,
  getItemsByCategory,
  getRegistryItem,
  getAllRegistryItems,
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

export default async function UtilityPage({ params }: PageProps) {
  const { category, name } = params;
  const item = getRegistryItem(category, name);

  if (!item) {
    notFound();
  }

  const allItems = getAllRegistryItems();
  const relatedUtilities = findRelatedUtilities(item, allItems, 6);

  // Render code with syntax highlighting for both light and dark themes
  const highlightedCodeLight = await codeToHtml(item.code, {
    lang: 'typescript',
    theme: 'github-light',
  });

  const highlightedCodeDark = await codeToHtml(item.code, {
    lang: 'typescript',
    theme: 'github-dark',
  });

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-10">
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
          <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
          <p className="text-lg text-muted-foreground">{item.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Installation */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Installation</h2>
              <div className="rounded-lg bg-secondary/40 p-4 flex items-center justify-between ring-1 ring-border/60">
                <code className="text-sm">npx fragmen add {item.slug}</code>
                <CopyButton text={`npx fragmen add ${item.slug}`} />
              </div>
            </section>

            {/* Code */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Source Code</h2>
                <CopyButton text={item.code} />
              </div>
              <div className="relative rounded-xl overflow-hidden ring-1 ring-border/60 shadow-lg">
                {/* Theme-aware syntax highlighted code */}
                <div
                  className="dark:hidden overflow-x-auto [&>pre]:!m-0 [&>pre]:!rounded-none [&>pre]:!bg-white [&>pre]:!p-6"
                  dangerouslySetInnerHTML={{ __html: highlightedCodeLight }}
                />
                <div
                  className="hidden dark:block overflow-x-auto [&>pre]:!m-0 [&>pre]:!rounded-none [&>pre]:!bg-[#0d1117] [&>pre]:!p-6"
                  dangerouslySetInnerHTML={{ __html: highlightedCodeDark }}
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
            <section className="rounded-lg border border-border bg-background p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigator.clipboard.writeText(item.code)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-secondary/60 hover:bg-secondary transition-colors text-left"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy Source Code
                </button>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(`npx fragmen add ${item.slug}`)
                  }
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-secondary/60 hover:bg-secondary transition-colors text-left"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  Copy Install Command
                </button>
              </div>
            </section>

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
            <section className="rounded-lg border border-border bg-background p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                Information
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dependencies</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Test Coverage</span>
                  <span className="font-semibold">99%+</span>
                </div>
                {item.since && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Added</span>
                    <span className="font-medium">{item.since}</span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <BackToTop />
    </main>
  );
}
