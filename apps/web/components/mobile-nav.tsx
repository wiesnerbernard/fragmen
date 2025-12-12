'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-secondary transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-background border-b border-border z-50 md:hidden">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/utilities"
                  className="text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Utilities
                </Link>
                <Link
                  href="/favorites"
                  className="text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  href="/docs"
                  className="text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Docs
                </Link>
                <Link
                  href="/changelog"
                  className="text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Changelog
                </Link>
                <Link
                  href="/requests"
                  className="text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Requests
                </Link>
                <div className="border-t border-border pt-3 mt-3">
                  <a
                    href="https://github.com/wiesnerbernard/fragmen"
                    className="text-sm text-muted-foreground px-3 py-2 rounded-md hover:bg-secondary transition-colors block"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.npmjs.com/package/fragmen"
                    className="text-sm text-muted-foreground px-3 py-2 rounded-md hover:bg-secondary transition-colors block"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    npm
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
