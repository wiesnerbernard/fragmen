// Manual configuration for utility status badges
// Add utilities here that should display a status badge

export const UTILITY_STATUS = {
  // Example: "array/chunk": "New",
  // Example: "string/slugify": "Updated",
} as const;

export type UtilityStatus =
  (typeof UTILITY_STATUS)[keyof typeof UTILITY_STATUS];

// Status badge styling
export const STATUS_STYLES: Record<string, string> = {
  New: 'bg-green-500/15 text-green-700 border-green-500/20',
  Updated: 'bg-blue-500/15 text-blue-700 border-blue-500/20',
  Beta: 'bg-orange-500/15 text-orange-700 border-orange-500/20',
  Deprecated: 'bg-red-500/15 text-red-700 border-red-500/20',
};
