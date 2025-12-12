'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

/**
 * Hook to track utility page views
 */
export function useTrackView(utility: string) {
  useEffect(() => {
    analytics.track('view', utility);
  }, [utility]);
}

/**
 * Function to track copy events
 */
export function trackCopy(utility: string) {
  analytics.track('copy', utility);
}

/**
 * Function to track install command copies
 */
export function trackInstall(utility: string) {
  analytics.track('install', utility);
}
