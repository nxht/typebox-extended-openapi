import { describe, expect, test } from 'bun:test';
import { type Static, Type, TypeGuard } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { IsStringEnum, StringEnum } from '../src/string-enum.schema';

describe('StringEnum', () => {
  test('base', () => {
    const t = StringEnum(['a', 'b'] as const);
    type t = Static<typeof t>;
    expect(TypeGuard.IsKindOf(t, 'StringEnum')).toBe(true);
    expect(t.enum).toEqual(['a', 'b']);
  });
});

describe('IsStringEnum', () => [
  test('TStringEnum', () => {
    const t = StringEnum(['a', 'b'] as const);
    expect(IsStringEnum(t)).toBe(true);
    expect(TypeGuard.IsString(t)).toBe(false);
  }),

  test('TString', () => {
    const t = Type.String({ enum: ['a', 'b'] as const });
    expect(IsStringEnum(t)).toBe(false);
    expect(TypeGuard.IsString(t)).toBe(true);
  }),
]);

describe('Value', () => {
  test('base', () => {
    const t = StringEnum(['a', 'b'] as const);
    expect(Value.Check(t, 'a')).toBe(true);
    expect(Value.Check(t, 'b')).toBe(true);
    expect(Value.Check(t, 'c')).toBe(false);
  });
});
