export function calculateBundleSize(code: string): {
  bytes: number;
  kilobytes: string;
} {
  const bytes = new Blob([code]).size;
  const kilobytes = (bytes / 1024).toFixed(2);

  return { bytes, kilobytes };
}

export function formatBundleSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  return `${(bytes / 1024).toFixed(2)} KB`;
}
