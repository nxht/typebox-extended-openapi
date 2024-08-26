import { describe, expect, test } from 'bun:test';
import { type Static, TypeGuard } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { StringWithAutoComplete } from '../src/string-with-auto-complete.schema';

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
