'use client';

import { useState } from 'react';
import { trackCopy, trackInstall } from '@/lib/use-analytics';

interface QuickActionsProps {
  code: string;
  slug: string;
}

export function QuickActions({ code, slug }: QuickActionsProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      trackCopy(slug);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(`npx fragmen add ${slug}`);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
      trackInstall(slug);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="rounded-lg border border-border bg-background p-4 shadow-sm">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
        Quick Actions
      </h3>
      <div className="space-y-2">
        <button
          onClick={handleCopyCode}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-secondary/60 hover:bg-secondary transition-colors text-left"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {copiedCode ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            )}
          </svg>
          {copiedCode ? 'Copied!' : 'Copy Source Code'}
        </button>
        <button
          onClick={handleCopyCommand}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-secondary/60 hover:bg-secondary transition-colors text-left"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {copiedCommand ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            )}
          </svg>
          {copiedCommand ? 'Copied!' : 'Copy Install Command'}
        </button>
      </div>
    </section>
  );
}
