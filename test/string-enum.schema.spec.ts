import { describe, expect, test } from 'bun:test';
import { Type, TypeGuard } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { TypeX } from '../src';
import { IsStringEnum } from '../src/string-enum.schema';

describe('StringEnum', () => {
  test('base', () => {
    const t = TypeX.StringEnum(['a', 'b']);
    type t = typeof t.static;
    expect(TypeGuard.IsKindOf(t, 'StringEnum')).toBe(true);
    expect(t.enum).toEqual(['a', 'b']);
  });
});

describe('IsStringEnum', () => [
  test('TStringEnum', () => {
    const t = TypeX.StringEnum(['a', 'b']);
    expect(IsStringEnum(t)).toBe(true);
    expect(TypeGuard.IsString(t)).toBe(false);
  }),

  test('TString', () => {
    const t = Type.String({ enum: ['a', 'b'] });
    expect(IsStringEnum(t)).toBe(false);
    expect(TypeGuard.IsString(t)).toBe(true);
  }),
]);

describe('Value', () => {
  test('base', () => {
    const t = TypeX.StringEnum(['a', 'b']);
    expect(Value.Check(t, 'a')).toBe(true);
    expect(Value.Check(t, 'b')).toBe(true);
    expect(Value.Check(t, 'c')).toBe(false);
  });
});
