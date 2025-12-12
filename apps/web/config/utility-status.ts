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

// Map status labels to badge variants
export const STATUS_VARIANTS: Record<
  string,
  'new' | 'updated' | 'beta' | 'deprecated'
> = {
  New: 'new',
  Updated: 'updated',
  Beta: 'beta',
  Deprecated: 'deprecated',
};
