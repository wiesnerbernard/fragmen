import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fragmen - Copy code fragments into your project',
  description: 'A utility library to copy code fragments directly into your project. Browse 50+ TypeScript utilities across 9 categories.',
  keywords: ['utility', 'library', 'code', 'fragments', 'typescript', 'javascript', 'utilities', 'helpers'],
  authors: [{ name: 'Bernard Wiesner' }],
  openGraph: {
    title: 'Fragmen - Copy code fragments into your project',
    description: 'Browse and add 50+ utility functions to your project with a single command.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
                <ThemeToggle />
              </div>
            </div>
          </nav>

          {children}

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
      </body>
    </html>
  )
}
