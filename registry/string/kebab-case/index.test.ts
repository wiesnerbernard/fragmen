import { describe, it, expect } from 'vitest';
import { kebabCase } from './index.js';

describe('kebabCase', () => {
  it('should convert camelCase to kebab-case', () => {
    expect(kebabCase('firstName')).toBe('first-name');
    expect(kebabCase('backgroundColor')).toBe('background-color');
    expect(kebabCase('getElementById')).toBe('get-element-by-id');
  });

  it('should convert PascalCase to kebab-case', () => {
    expect(kebabCase('FirstName')).toBe('first-name');
    expect(kebabCase('XMLHttpRequest')).toBe('xml-http-request');
    expect(kebabCase('HTMLElement')).toBe('html-element');
  });

  it('should convert spaces to hyphens', () => {
    expect(kebabCase('Hello World')).toBe('hello-world');
    expect(kebabCase('multiple word string')).toBe('multiple-word-string');
    expect(kebabCase('  multiple   spaces  ')).toBe('multiple-spaces');
  });

  it('should convert underscores to hyphens', () => {
    expect(kebabCase('snake_case')).toBe('snake-case');
    expect(kebabCase('snake_case_string')).toBe('snake-case-string');
    expect(kebabCase('mixed_snake and spaces')).toBe('mixed-snake-and-spaces');
  });

  it('should handle mixed cases', () => {
    expect(kebabCase('camelCase_with_underscores')).toBe(
      'camel-case-with-underscores'
    );
    expect(kebabCase('PascalCase With Spaces')).toBe('pascal-case-with-spaces');
    expect(kebabCase('mixed_Case AND spaces')).toBe('mixed-case-and-spaces');
  });

  it('should handle already kebab-case strings', () => {
    expect(kebabCase('already-kebab-case')).toBe('already-kebab-case');
    expect(kebabCase('multiple-words-here')).toBe('multiple-words-here');
  });

  it('should handle empty and whitespace strings', () => {
    expect(kebabCase('')).toBe('');
    expect(kebabCase('   ')).toBe('');
    expect(kebabCase('\t\n')).toBe('');
  });

  it('should handle single words', () => {
    expect(kebabCase('word')).toBe('word');
    expect(kebabCase('Word')).toBe('word');
    expect(kebabCase('WORD')).toBe('word');
  });

  it('should handle numbers and special characters', () => {
    expect(kebabCase('version2Update')).toBe('version2-update');
    expect(kebabCase('HTML5Parser')).toBe('html5-parser');
    expect(kebabCase('test-with-numbers-123')).toBe('test-with-numbers-123');
  });

  it('should remove multiple consecutive hyphens', () => {
    expect(kebabCase('multiple---hyphens')).toBe('multiple-hyphens');
    expect(kebabCase('test__with__underscores')).toBe('test-with-underscores');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(kebabCase('-leading-hyphen')).toBe('leading-hyphen');
    expect(kebabCase('trailing-hyphen-')).toBe('trailing-hyphen');
    expect(kebabCase('-both-sides-')).toBe('both-sides');
  });
});
