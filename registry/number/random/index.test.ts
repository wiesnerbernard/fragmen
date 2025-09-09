import { describe, it, expect, vi } from 'vitest';
import { random } from './index.js';

describe('random', () => {
  it('should return a number within the specified range for floats', () => {
    for (let i = 0; i < 100; i++) {
      const result = random(0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });

  it('should return an integer within the specified range when integer=true', () => {
    for (let i = 0; i < 100; i++) {
      const result = random(1, 7, true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(7);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('should handle negative ranges', () => {
    for (let i = 0; i < 50; i++) {
      const result = random(-10, -5);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThan(-5);
    }
  });

  it('should handle ranges crossing zero', () => {
    for (let i = 0; i < 50; i++) {
      const result = random(-5, 5);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThan(5);
    }
  });

  it('should return min when min equals max', () => {
    expect(random(5, 5)).toBe(5);
    expect(random(0, 0)).toBe(0);
    expect(random(-3, -3)).toBe(-3);
  });

  it('should handle decimal ranges', () => {
    for (let i = 0; i < 50; i++) {
      const result = random(1.5, 2.5);
      expect(result).toBeGreaterThanOrEqual(1.5);
      expect(result).toBeLessThan(2.5);
    }
  });

  it('should throw error when min > max', () => {
    expect(() => random(10, 5)).toThrow(
      'Minimum value cannot be greater than maximum value'
    );
    expect(() => random(1, 0)).toThrow(
      'Minimum value cannot be greater than maximum value'
    );
  });

  it('should use Math.random internally', () => {
    const mockRandom = vi.spyOn(Math, 'random');
    mockRandom.mockReturnValue(0.5);

    const result = random(0, 10);
    expect(result).toBe(5);
    expect(mockRandom).toHaveBeenCalled();

    mockRandom.mockRestore();
  });

  it('should generate different values on multiple calls', () => {
    const values = new Set();
    for (let i = 0; i < 50; i++) {
      values.add(random(0, 1000));
    }
    // Should have generated many different values (allowing for some rare duplicates)
    expect(values.size).toBeGreaterThan(40);
  });

  it('should handle integer generation correctly', () => {
    const mockRandom = vi.spyOn(Math, 'random');

    // Test edge cases for integer generation
    mockRandom.mockReturnValue(0); // Should give min
    expect(random(1, 6, true)).toBe(1);

    mockRandom.mockReturnValue(0.99999); // Should give max-1
    expect(random(1, 6, true)).toBe(5);

    mockRandom.mockRestore();
  });
});
