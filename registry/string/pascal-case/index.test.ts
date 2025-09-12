import { describe, expect, it } from 'vitest';
import { pascalCase } from './index.js';

describe('pascalCase', () => {
  it('should convert spaces to PascalCase', () => {
    expect(pascalCase('Hello World')).toBe('HelloWorld');
    expect(pascalCase('multiple word string')).toBe('MultipleWordString');
    expect(pascalCase('  multiple   spaces  ')).toBe('MultipleSpaces');
  });

  it('should convert snake_case to PascalCase', () => {
    expect(pascalCase('first_name')).toBe('FirstName');
    expect(pascalCase('background_color')).toBe('BackgroundColor');
    expect(pascalCase('get_element_by_id')).toBe('GetElementById');
  });

  it('should convert kebab-case to PascalCase', () => {
    expect(pascalCase('kebab-case')).toBe('KebabCase');
    expect(pascalCase('kebab-case-string')).toBe('KebabCaseString');
    expect(pascalCase('mixed-kebab-and-spaces')).toBe('MixedKebabAndSpaces');
  });

  it('should convert camelCase to PascalCase', () => {
    expect(pascalCase('firstName')).toBe('FirstName');
    expect(pascalCase('xmlHttpRequest')).toBe('XmlHttpRequest');
    expect(pascalCase('htmlElement')).toBe('HtmlElement');
  });

  it('should handle mixed cases', () => {
    expect(pascalCase('camelCase_with_underscores')).toBe(
      'CamelCaseWithUnderscores'
    );
    expect(pascalCase('PascalCase With Spaces')).toBe('PascalCaseWithSpaces');
    expect(pascalCase('mixed-Case AND spaces')).toBe('MixedCaseAndSpaces');
  });

  it('should handle already PascalCase strings', () => {
    expect(pascalCase('AlreadyPascalCase')).toBe('AlreadyPascalCase');
    expect(pascalCase('MultipleWordsHere')).toBe('MultipleWordsHere');
  });

  it('should handle empty and whitespace strings', () => {
    expect(pascalCase('')).toBe('');
    expect(pascalCase('   ')).toBe('');
    expect(pascalCase('\t\n')).toBe('');
  });

  it('should return empty string for non-string input', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pascalCase({} as unknown as string)).toBe('');
  });

  it('should handle single words', () => {
    expect(pascalCase('word')).toBe('Word');
    expect(pascalCase('Word')).toBe('Word');
    expect(pascalCase('WORD')).toBe('Word');
  });

  it('should handle numbers and special characters', () => {
    expect(pascalCase('version 2 update')).toBe('Version2Update');
    expect(pascalCase('HTML5 Parser')).toBe('Html5Parser');
    expect(pascalCase('test-with-numbers-123')).toBe('TestWithNumbers123');
  });

  it('should handle consecutive delimiters', () => {
    expect(pascalCase('multiple___underscores')).toBe('MultipleUnderscores');
    expect(pascalCase('test---with---hyphens')).toBe('TestWithHyphens');
    expect(pascalCase('mixed  _-  delimiters')).toBe('MixedDelimiters');
  });

  it('should handle leading and trailing delimiters', () => {
    expect(pascalCase('_leading_underscore')).toBe('LeadingUnderscore');
    expect(pascalCase('trailing-hyphen-')).toBe('TrailingHyphen');
    expect(pascalCase(' both sides ')).toBe('BothSides');
  });
});
