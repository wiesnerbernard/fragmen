import { describe, it, expect } from 'vitest';
import { safeParse } from './index';

describe('safeParse', () => {
  it('parses valid JSON', () => {
    expect(safeParse('{"a":1}')).toEqual({ a: 1 });
  });

  it('returns undefined for invalid JSON', () => {
    expect(safeParse('{a:1}')).toBeUndefined();
  });
});
