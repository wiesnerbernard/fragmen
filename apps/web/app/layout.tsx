import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fragmen - Copy code fragments into your project',
  description:
    'A utility library to copy code fragments directly into your project. Browse 50+ TypeScript utilities across 9 categories.',
  keywords: [
    'utility',
    'library',
    'code',
    'fragments',
    'typescript',
    'javascript',
    'utilities',
    'helpers',
  ],
  authors: [{ name: 'Bernard Wiesner' }],
  openGraph: {
    title: 'Fragmen - Copy code fragments into your project',
    description:
      'Browse and add 50+ utility functions to your project with a single command.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navigation */}
          <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link href="/" className="text-xl font-bold">
                    Fragmen
                  </Link>
                  <div className="hidden md:flex items-center gap-6">
                    <Link
                      href="/utilities"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Utilities
                    </Link>
                    <Link
                      href="/docs"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Docs
                    </Link>
                    <a
                      href="https://github.com/wiesnerbernard/fragmen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/wiesnerbernard/fragmen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 rounded-full bg-secondary/80 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    Star on GitHub
                  </a>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          <div className="flex-1">{children}</div>

          {/* Footer */}
          <footer className="border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-muted-foreground">
                  Built by{' '}
                  <a
                    href="https://github.com/wiesnerbernard"
                    className="underline underline-offset-4 hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bernard Wiesner
                  </a>
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/wiesnerbernard/fragmen"
                    className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.npmjs.com/package/fragmen"
                    className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    npm
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
