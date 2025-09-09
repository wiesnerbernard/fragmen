import { describe, it, expect } from 'vitest';
import { camelCase } from './index.js';

describe('camelCase', () => {
  it('should convert spaces to camelCase', () => {
    expect(camelCase('Hello World')).toBe('helloWorld');
    expect(camelCase('multiple word string')).toBe('multipleWordString');
    expect(camelCase('  multiple   spaces  ')).toBe('multipleSpaces');
  });

  it('should convert snake_case to camelCase', () => {
    expect(camelCase('first_name')).toBe('firstName');
    expect(camelCase('background_color')).toBe('backgroundColor');
    expect(camelCase('get_element_by_id')).toBe('getElementById');
  });

  it('should convert kebab-case to camelCase', () => {
    expect(camelCase('kebab-case')).toBe('kebabCase');
    expect(camelCase('kebab-case-string')).toBe('kebabCaseString');
    expect(camelCase('mixed-kebab-and-spaces')).toBe('mixedKebabAndSpaces');
  });

  it('should convert PascalCase to camelCase', () => {
    expect(camelCase('FirstName')).toBe('firstName');
    expect(camelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
    expect(camelCase('HTMLElement')).toBe('htmlElement');
  });

  it('should handle mixed cases', () => {
    expect(camelCase('camelCase_with_underscores')).toBe(
      'camelCaseWithUnderscores'
    );
    expect(camelCase('PascalCase With Spaces')).toBe('pascalCaseWithSpaces');
    expect(camelCase('mixed-Case AND spaces')).toBe('mixedCaseAndSpaces');
  });

  it('should handle already camelCase strings', () => {
    expect(camelCase('alreadyCamelCase')).toBe('alreadyCamelCase');
    expect(camelCase('multipleWordsHere')).toBe('multipleWordsHere');
  });

  it('should handle empty and whitespace strings', () => {
    expect(camelCase('')).toBe('');
    expect(camelCase('   ')).toBe('');
    expect(camelCase('\t\n')).toBe('');
  });

  it('should handle single words', () => {
    expect(camelCase('word')).toBe('word');
    expect(camelCase('Word')).toBe('word');
    expect(camelCase('WORD')).toBe('word');
  });

  it('should handle numbers and special characters', () => {
    expect(camelCase('version 2 update')).toBe('version2Update');
    expect(camelCase('HTML5 Parser')).toBe('html5Parser');
    expect(camelCase('test-with-numbers-123')).toBe('testWithNumbers123');
  });

  it('should handle consecutive delimiters', () => {
    expect(camelCase('multiple___underscores')).toBe('multipleUnderscores');
    expect(camelCase('test---with---hyphens')).toBe('testWithHyphens');
    expect(camelCase('mixed  _-  delimiters')).toBe('mixedDelimiters');
  });

  it('should handle leading and trailing delimiters', () => {
    expect(camelCase('_leading_underscore')).toBe('leadingUnderscore');
    expect(camelCase('trailing-hyphen-')).toBe('trailingHyphen');
    expect(camelCase(' both sides ')).toBe('bothSides');
  });
});
