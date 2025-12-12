'use client';

import { useTrackView } from '@/lib/use-analytics';
import { useEffect } from 'react';

interface AnalyticsTrackerProps {
  utility: string;
}

export function AnalyticsTracker({ utility }: AnalyticsTrackerProps) {
  useTrackView(utility);
  return null;
}
