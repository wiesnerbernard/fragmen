/**
 * Reverses the characters of a string.
 *
 * Uses Intl.Segmenter when available to reverse by grapheme clusters
 * (so complex emojis and combined characters are handled correctly).
 * Falls back to a simple split/reverse/join when Segmenter is not available.
 *
 * @param str The string to reverse.
 * @returns The reversed string. Returns '' for non-string input.
 * @example
 * reverse('hello')
 * // => 'olleh'
 */
export function reverse(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }

  // Use grapheme-aware segmentation when supported
  const maybeSegmenter = (
    Intl as unknown as {
      Segmenter?: new (
        locale?: string,
        options?: { granularity?: 'grapheme' | 'word' | 'sentence' }
      ) => { segment: (input: string) => Iterable<{ segment: string }> };
    }
  ).Segmenter;
  if (typeof maybeSegmenter === 'function') {
    const segmenter = new maybeSegmenter(undefined, {
      granularity: 'grapheme',
    });
    const segments: string[] = [];
    for (const { segment } of segmenter.segment(str)) {
      segments.push(segment);
    }
    return segments.reverse().join('');
  }

  // Fallback
  return str.split('').reverse().join('');
}
