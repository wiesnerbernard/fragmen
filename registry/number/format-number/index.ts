/**
 * Formats a number with thousands separators and decimal places.
 *
 * Provides locale-aware number formatting with options for thousands separators,
 * decimal places, and custom separators. Useful for displaying numbers in
 * user interfaces, reports, and financial applications.
 *
 * @param value The number to format
 * @param options Formatting options
 * @returns The formatted number string
 *
 * @example
 * ```typescript
 * formatNumber(1234.567); // '1,234.567'
 * formatNumber(1234.567, { decimals: 2 }); // '1,234.57'
 * formatNumber(1234567.89, { decimals: 0 }); // '1,234,568'
 * formatNumber(1234.5, { thousandsSeparator: ' ' }); // '1 234.5'
 * formatNumber(1234.5, { decimalSeparator: ',' }); // '1,234,5'
 * formatNumber(1234.567, { thousandsSeparator: '.', decimalSeparator: ',' }); // '1.234,567'
 * formatNumber(-1234.567, { decimals: 2 }); // '-1,234.57'
 * formatNumber(0.123, { decimals: 4 }); // '0.1230'
 * ```
 */

export interface FormatNumberOptions {
  /** Number of decimal places to show */
  decimals?: number;
  /** Character used to separate thousands (default: ',') */
  thousandsSeparator?: string;
  /** Character used as decimal point (default: '.') */
  decimalSeparator?: string;
}

export function formatNumber(
  value: number,
  options: FormatNumberOptions = {}
): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  const {
    decimals,
    thousandsSeparator = ',',
    decimalSeparator = '.',
  } = options;

  // Handle the sign
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  // Round to specified decimal places if provided
  let roundedValue = absoluteValue;
  if (decimals !== undefined) {
    const factor = Math.pow(10, decimals);
    roundedValue = Math.round(absoluteValue * factor) / factor;
  }

  // Split into integer and decimal parts
  const valueString = roundedValue.toString();
  const [integerPart, decimalPart = ''] = valueString.split('.');

  // Add thousands separators to integer part
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  );

  // Handle decimal part
  let formattedDecimal = decimalPart;
  if (decimals !== undefined) {
    // Pad or truncate to exact decimal places
    formattedDecimal = decimalPart.padEnd(decimals, '0').slice(0, decimals);
  }

  // Combine parts
  let result = formattedInteger;
  if (formattedDecimal.length > 0) {
    result += decimalSeparator + formattedDecimal;
  }

  // Add negative sign if needed
  return isNegative ? `-${result}` : result;
}
