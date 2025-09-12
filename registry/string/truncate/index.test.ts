import { describe, expect, it } from 'vitest';
import { truncate } from '.';

describe('truncate', () => {
  const long = 'Hello world, this is a long string';

  it('returns original string when shorter than max length', () => {
    expect(truncate('short', { length: 10 })).toBe('short');
  });

  it('returns original string when equal to max length', () => {
    expect(truncate('equal', { length: 5 })).toBe('equal');
  });

  it('truncates and appends default omission', () => {
    expect(truncate(long, { length: 20 })).toBe('Hello world, this...');
  });

  it('uses a custom omission string', () => {
    const s = '123456789012345';
    expect(truncate(s, { length: 10, omission: '~' })).toBe('123456789~');
  });

  it('when max length is smaller than omission returns a slice of omission', () => {
    // default omission is '...'
    expect(truncate('anything', { length: 2 })).toBe('..');
  });

  it('when max length is zero returns empty string', () => {
    expect(truncate('anything', { length: 0 })).toBe('');
  });

  it('when max length equals omission length returns only omission', () => {
    // default omission length is 3
    expect(truncate('anything', { length: 3 })).toBe('...');
  });

  it('should return empty string for non-string input', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(truncate(null as unknown as string, { length: 5 })).toBe('');
  });
});
