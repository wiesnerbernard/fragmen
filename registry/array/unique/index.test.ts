import { describe, it, expect } from 'vitest';
import { unique } from './index';

describe('unique', () => {
  it('returns unique numbers', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it('returns unique strings', () => {
    expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
  });
});
