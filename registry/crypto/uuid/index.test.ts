import { describe, expect, it } from 'vitest';
import { uuid } from '.';

describe('uuid', () => {
  it('should generate a valid UUID v4 format', () => {
    const id = uuid();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(id).toMatch(uuidRegex);
  });

  it('should generate unique UUIDs', () => {
    const ids = new Set<string>();
    for (let i = 0; i < 1000; i++) {
      ids.add(uuid());
    }
    expect(ids.size).toBe(1000);
  });

  it('should always have version 4 marker', () => {
    const id = uuid();
    expect(id.charAt(14)).toBe('4');
  });

  it('should always have correct variant bits', () => {
    const id = uuid();
    const variantChar = id.charAt(19);
    expect(['8', '9', 'a', 'b']).toContain(variantChar.toLowerCase());
  });

  it('should return string of correct length', () => {
    const id = uuid();
    expect(id).toHaveLength(36); // 32 hex chars + 4 hyphens
  });

  it('should have hyphens in correct positions', () => {
    const id = uuid();
    expect(id.charAt(8)).toBe('-');
    expect(id.charAt(13)).toBe('-');
    expect(id.charAt(18)).toBe('-');
    expect(id.charAt(23)).toBe('-');
  });
});
