/**
 * Simple client-side analytics for tracking utility usage
 * Stores data in localStorage (no backend needed)
 */

export interface AnalyticsEvent {
  type: 'view' | 'copy' | 'install';
  utility: string;
  timestamp: number;
}

const STORAGE_KEY = 'fragmen_analytics';
const MAX_EVENTS = 1000; // Limit stored events

class Analytics {
  private getEvents(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveEvents(events: AnalyticsEvent[]): void {
    if (typeof window === 'undefined') return;

    try {
      // Keep only the most recent events
      const trimmed = events.slice(-MAX_EVENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }

  track(type: AnalyticsEvent['type'], utility: string): void {
    const events = this.getEvents();
    events.push({
      type,
      utility,
      timestamp: Date.now(),
    });
    this.saveEvents(events);
  }

  getPopularUtilities(limit = 10): Array<{ utility: string; count: number }> {
    const events = this.getEvents();
    const counts = new Map<string, number>();

    events.forEach(event => {
      counts.set(event.utility, (counts.get(event.utility) || 0) + 1);
    });

    return Array.from(counts.entries())
      .map(([utility, count]) => ({ utility, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  getUtilityStats(utility: string): {
    views: number;
    copies: number;
    installs: number;
    total: number;
  } {
    const events = this.getEvents();
    const utilityEvents = events.filter(e => e.utility === utility);

    return {
      views: utilityEvents.filter(e => e.type === 'view').length,
      copies: utilityEvents.filter(e => e.type === 'copy').length,
      installs: utilityEvents.filter(e => e.type === 'install').length,
      total: utilityEvents.length,
    };
  }

  getRecentActivity(limit = 20): AnalyticsEvent[] {
    const events = this.getEvents();
    return events.slice(-limit).reverse();
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const analytics = new Analytics();
