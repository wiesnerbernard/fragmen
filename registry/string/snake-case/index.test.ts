import { describe, expect, it } from 'vitest';
import { snakeCase } from './index.js';

describe('snakeCase', () => {
  it('should convert camelCase to snake_case', () => {
    expect(snakeCase('firstName')).toBe('first_name');
    expect(snakeCase('backgroundColor')).toBe('background_color');
    expect(snakeCase('getElementById')).toBe('get_element_by_id');
  });

  it('should convert PascalCase to snake_case', () => {
    expect(snakeCase('FirstName')).toBe('first_name');
    expect(snakeCase('XMLHttpRequest')).toBe('xml_http_request');
    expect(snakeCase('HTMLElement')).toBe('html_element');
  });

  it('should convert spaces to underscores', () => {
    expect(snakeCase('Hello World')).toBe('hello_world');
    expect(snakeCase('multiple word string')).toBe('multiple_word_string');
    expect(snakeCase('  multiple   spaces  ')).toBe('multiple_spaces');
  });

  it('should convert hyphens to underscores', () => {
    expect(snakeCase('kebab-case')).toBe('kebab_case');
    expect(snakeCase('kebab-case-string')).toBe('kebab_case_string');
    expect(snakeCase('mixed-kebab and spaces')).toBe('mixed_kebab_and_spaces');
  });

  it('should handle mixed cases', () => {
    expect(snakeCase('camelCase-with-hyphens')).toBe('camel_case_with_hyphens');
    expect(snakeCase('PascalCase With Spaces')).toBe('pascal_case_with_spaces');
    expect(snakeCase('mixed-Case AND spaces')).toBe('mixed_case_and_spaces');
  });

  it('should handle already snake_case strings', () => {
    expect(snakeCase('already_snake_case')).toBe('already_snake_case');
    expect(snakeCase('multiple_words_here')).toBe('multiple_words_here');
  });

  it('should handle empty and whitespace strings', () => {
    expect(snakeCase('')).toBe('');
    expect(snakeCase('   ')).toBe('');
    expect(snakeCase('\t\n')).toBe('');
  });

  it('should return empty string for non-string input', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(snakeCase(undefined as unknown as string)).toBe('');
  });

  it('should handle single words', () => {
    expect(snakeCase('word')).toBe('word');
    expect(snakeCase('Word')).toBe('word');
    expect(snakeCase('WORD')).toBe('word');
  });

  it('should handle numbers and special characters', () => {
    expect(snakeCase('version2Update')).toBe('version2_update');
    expect(snakeCase('HTML5Parser')).toBe('html5_parser');
    expect(snakeCase('test_with_numbers_123')).toBe('test_with_numbers_123');
  });

  it('should remove multiple consecutive underscores', () => {
    expect(snakeCase('multiple___underscores')).toBe('multiple_underscores');
    expect(snakeCase('test--with--hyphens')).toBe('test_with_hyphens');
  });

  it('should remove leading and trailing underscores', () => {
    expect(snakeCase('_leading_underscore')).toBe('leading_underscore');
    expect(snakeCase('trailing_underscore_')).toBe('trailing_underscore');
    expect(snakeCase('_both_sides_')).toBe('both_sides');
  });
});
