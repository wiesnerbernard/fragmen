import { CopyButton } from '@/components/copy-button';
import {
  getCategories,
  getItemsByCategory,
  getRegistryItem,
} from '@/lib/registry';
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
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/utilities"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to utilities
          </Link>
          <div className="mb-2">
            <span className="inline-block rounded bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {item.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
          <p className="text-lg text-muted-foreground">{item.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Installation */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Installation</h2>
              <div className="rounded-lg border border-border bg-secondary/50 p-4 flex items-center justify-between">
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
              <div className="relative rounded-lg border border-border overflow-hidden">
                <div
                  className="dark:hidden overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: highlightedCodeLight }}
                />
                <div
                  className="hidden dark:block overflow-x-auto"
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
                        className="rounded-lg border border-border overflow-hidden"
                      >
                        <pre className="p-4 overflow-x-auto bg-secondary/50">
                          <code className="text-sm">{cleanCode}</code>
                        </pre>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Parameters */}
            {item.params.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Parameters</h3>
                <div className="space-y-3">
                  {item.params.map((param, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border p-3 bg-background"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <code className="text-sm font-medium text-primary">
                          {param.name}
                        </code>
                        <code className="text-xs text-muted-foreground">
                          {param.type}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {param.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Returns */}
            {item.returns.type && (
              <section>
                <h3 className="text-lg font-semibold mb-3">Returns</h3>
                <div className="rounded-lg border border-border p-3 bg-background">
                  <code className="text-xs text-muted-foreground mb-1 block">
                    {item.returns.type}
                  </code>
                  <p className="text-sm text-muted-foreground">
                    {item.returns.description}
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
