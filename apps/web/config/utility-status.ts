// Manual configuration for utility status badges
// Add utilities here that should display a status badge

// To add a badge to a utility:
// 1. Find the utility's slug (e.g., "function/throttle", "array/chunk")
// 2. Add it below with a status: "New", "Updated", "Beta", or "Deprecated"
// 3. To remove a badge, just delete the line
export const UTILITY_STATUS = {
  'function/throttle': 'New',
} as const;

export type UtilityStatus =
  (typeof UTILITY_STATUS)[keyof typeof UTILITY_STATUS];

// Status badge styling
export const STATUS_STYLES: Record<string, string> = {
  New: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30',
  Updated: 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30',
  Beta: 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30',
  Deprecated: 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30',
};
