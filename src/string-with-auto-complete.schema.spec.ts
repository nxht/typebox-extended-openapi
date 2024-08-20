import { TypeGuard, type Static } from '@sinclair/typebox';
import { describe, test, expect } from 'bun:test';
import { Value } from '@sinclair/typebox/value';
import { StringWithAutoComplete } from './string-with-auto-complete.schema';

describe('StringWithAutoComplete', () => {
  test('base', () => {
    const t = StringWithAutoComplete(['a', 'b'] as const);
    type t = Static<typeof t>;
    expect(TypeGuard.IsString(t)).toBe(true);
    expect(t.enum).toEqual(['a', 'b']);
  });
});

describe('Value', () => {
  test('base', () => {
    const t = StringWithAutoComplete(['a', 'b'] as const);
    expect(Value.Check(t, 'a')).toBe(true);
    expect(Value.Check(t, 'b')).toBe(true);
    expect(Value.Check(t, 'c')).toBe(true);
  });
});
