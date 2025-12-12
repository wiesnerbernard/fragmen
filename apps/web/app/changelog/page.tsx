import fs from 'fs';
import Link from 'next/link';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export const metadata = {
  title: 'Changelog - Fragmen',
  description: 'Track all updates, new utilities, and improvements to Fragmen',
};

async function getChangelog() {
  const changelogPath = path.join(process.cwd(), '../../CHANGELOG.md');
  const markdown = fs.readFileSync(changelogPath, 'utf-8');

  // Remove the [Unreleased] section - only show released versions
  const lines = markdown.split('\n');
  const filteredLines: string[] = [];
  let inUnreleasedSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Start of Unreleased section
    if (line.match(/^##\s+\[Unreleased\]/)) {
      inUnreleasedSection = true;
      continue;
    }

    // Start of a new version section (end of Unreleased)
    if (inUnreleasedSection && line.match(/^##\s+\[[\d.]+\]/)) {
      inUnreleasedSection = false;
    }

    // Skip lines in Unreleased section
    if (inUnreleasedSection) {
      continue;
    }

    filteredLines.push(line);
  }

  const filtered = filteredLines.join('\n');
  const processed = await remark().use(html).process(filtered);
  return processed.toString();
}

export default async function ChangelogPage() {
  const changelogHtml = await getChangelog();

  return (
    <main className="min-h-screen">
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Changelog</h1>
          <p className="text-lg text-muted-foreground">
            All notable changes, new utilities, and improvements to Fragmen
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <article
            className="prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-primary
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-ul:my-4 prose-li:my-1
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-secondary/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']"
            dangerouslySetInnerHTML={{ __html: changelogHtml }}
          />
        </div>
      </div>
    </main>
  );
}
