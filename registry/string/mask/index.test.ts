import { describe, expect, it } from 'vitest';
import { mask } from './index';

describe('mask', () => {
  it('should mask the entire string by default', () => {
    const result = mask('secret');

    expect(result).toBe('******');
  });

  it('should mask from start index to end', () => {
    const result = mask('4532-1234-5678-9010', { start: 5, end: 14 });

    expect(result).toBe('4532-*********-9010');
  });

  it('should handle negative indices for end', () => {
    const result = mask('4532-1234-5678-9010', { start: 4, end: -4 });

    // String is 19 chars, start=4, end=-4 means end at position 15
    // Masks chars 4-14 (11 chars)
    expect(result).toBe('4532***********9010');
  });

  it('should handle negative indices for start', () => {
    const result = mask('secret', { start: -4, end: -1 });

    expect(result).toBe('se***t');
  });

  it('should use custom mask character', () => {
    const result = mask('555-1234', { start: 0, end: 3, char: 'X' });

    expect(result).toBe('XXX-1234');
  });

  it('should mask email addresses', () => {
    const result = mask('user@example.com', { start: 2, end: -12 });

    expect(result).toBe('us**@example.com');
  });

  it('should mask credit card numbers', () => {
    const result = mask('4532123456789010', { start: 4, end: -4 });

    expect(result).toBe('4532********9010');
  });

  it('should mask phone numbers', () => {
    const result = mask('555-123-4567', { start: 0, end: 7 });

    expect(result).toBe('*******-4567');
  });

  it('should handle empty strings', () => {
    const result = mask('');

    expect(result).toBe('');
  });

  it('should handle start equal to end', () => {
    const result = mask('secret', { start: 3, end: 3 });

    expect(result).toBe('secret');
  });

  it('should handle start greater than end', () => {
    const result = mask('secret', { start: 5, end: 2 });

    expect(result).toBe('secret');
  });

  it('should mask with multi-character mask', () => {
    // 'secret' has 6 chars, start=1, end=-1 means positions 1-4 (4 chars)
    // With 'XX' as mask char, we get 4 repetitions = 8 X's
    const result = mask('secret', { start: 1, end: -1, char: 'XX' });

    expect(result).toBe('sXXXXXXXXt');
  });

  it('should handle indices out of bounds', () => {
    const result1 = mask('short', { start: 10, end: 20 });
    const result2 = mask('short', { start: -10, end: 2 });

    expect(result1).toBe('short');
    expect(result2).toBe('**ort');
  });

  it('should work with unicode characters', () => {
    const result = mask('🔒secret🔒', { start: 2, end: -2 });

    expect(result).toBe('🔒******🔒');
  });

  it('should preserve structure when masking', () => {
    // Mask only the middle digits section (including the hyphen)
    const card = '4532-1234-5678-9010';
    const result = mask(card, { start: 5, end: 14 });

    expect(result).toBe('4532-*********-9010');
    // The hyphens are masked too since they're in the range
    expect(result.split('-')).toHaveLength(3);
  });

  it('should handle single character strings', () => {
    const result = mask('a', { start: 0, end: 1 });

    expect(result).toBe('*');
  });

  it('should handle only start option', () => {
    const result = mask('secret', { start: 3 });

    expect(result).toBe('sec***');
  });

  it('should handle only end option', () => {
    const result = mask('secret', { end: 3 });

    expect(result).toBe('***ret');
  });

  it('should handle only char option', () => {
    const result = mask('secret', { char: '#' });

    expect(result).toBe('######');
  });
});
