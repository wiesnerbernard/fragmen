import { describe, it, expect } from 'vitest';
import { formatNumber } from './index.js';

describe('formatNumber', () => {
  it('should format numbers with default thousands separator', () => {
    expect(formatNumber(1234)).toBe('1,234');
    expect(formatNumber(1234567)).toBe('1,234,567');
    expect(formatNumber(1234567890)).toBe('1,234,567,890');
  });

  it('should handle decimal numbers', () => {
    expect(formatNumber(1234.567)).toBe('1,234.567');
    expect(formatNumber(1000.5)).toBe('1,000.5');
    expect(formatNumber(123.456789)).toBe('123.456789');
  });

  it('should format with specified decimal places', () => {
    expect(formatNumber(1234.567, { decimals: 2 })).toBe('1,234.57');
    expect(formatNumber(1234.567, { decimals: 0 })).toBe('1,235');
    expect(formatNumber(1234.567, { decimals: 4 })).toBe('1,234.5670');
    expect(formatNumber(1234, { decimals: 2 })).toBe('1,234.00');
  });

  it('should handle custom thousands separator', () => {
    expect(formatNumber(1234567, { thousandsSeparator: ' ' })).toBe(
      '1 234 567'
    );
    expect(formatNumber(1234567, { thousandsSeparator: '.' })).toBe(
      '1.234.567'
    );
    expect(formatNumber(1234567, { thousandsSeparator: '_' })).toBe(
      '1_234_567'
    );
    expect(formatNumber(1234567, { thousandsSeparator: '' })).toBe('1234567');
  });

  it('should handle custom decimal separator', () => {
    expect(formatNumber(1234.567, { decimalSeparator: ',' })).toBe('1,234,567');
    expect(formatNumber(1234.567, { decimalSeparator: '|' })).toBe('1,234|567');
  });

  it('should handle European-style formatting', () => {
    expect(
      formatNumber(1234.567, {
        thousandsSeparator: '.',
        decimalSeparator: ',',
      })
    ).toBe('1.234,567');

    expect(
      formatNumber(1234567.89, {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
        decimals: 2,
      })
    ).toBe('1 234 567,89');
  });

  it('should handle negative numbers', () => {
    expect(formatNumber(-1234.567)).toBe('-1,234.567');
    expect(formatNumber(-1234567, { decimals: 2 })).toBe('-1,234,567.00');
    expect(
      formatNumber(-1234.567, {
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('-1 234,567');
  });

  it('should handle zero and small numbers', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(0, { decimals: 2 })).toBe('0.00');
    expect(formatNumber(0.123, { decimals: 4 })).toBe('0.1230');
    expect(formatNumber(123, { decimals: 0 })).toBe('123');
  });

  it('should handle numbers less than 1000', () => {
    expect(formatNumber(123)).toBe('123');
    expect(formatNumber(123.45)).toBe('123.45');
    expect(formatNumber(999, { decimals: 2 })).toBe('999.00');
  });

  it('should handle special number values', () => {
    expect(formatNumber(Infinity)).toBe('Infinity');
    expect(formatNumber(-Infinity)).toBe('-Infinity');
    expect(formatNumber(NaN)).toBe('NaN');
  });

  it('should handle very large numbers', () => {
    expect(formatNumber(1e15)).toBe('1,000,000,000,000,000');
    expect(formatNumber(9876543210123, { decimals: 2 })).toBe(
      '9,876,543,210,123.00'
    );
  });

  it('should handle rounding correctly', () => {
    expect(formatNumber(1234.999, { decimals: 2 })).toBe('1,235.00');
    expect(formatNumber(1234.994, { decimals: 2 })).toBe('1,234.99');
    expect(formatNumber(1234.996, { decimals: 2 })).toBe('1,235.00');
  });

  it('should handle edge case with zero decimals', () => {
    expect(formatNumber(1234.9, { decimals: 0 })).toBe('1,235');
    expect(formatNumber(1234.1, { decimals: 0 })).toBe('1,234');
    expect(formatNumber(1234.5, { decimals: 0 })).toBe('1,235');
  });

  it('should handle complex combinations', () => {
    expect(
      formatNumber(1234567.89123, {
        decimals: 3,
        thousandsSeparator: '_',
        decimalSeparator: ':',
      })
    ).toBe('1_234_567:891');

    expect(
      formatNumber(-987654321.123456, {
        decimals: 1,
        thousandsSeparator: ' ',
        decimalSeparator: ',',
      })
    ).toBe('-987 654 321,1');
  });
});
