import { describe, expect, test } from 'bun:test';
import { Type, TypeGuard } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { TypeX } from '../src';

describe('Nullable', () => {
  test('base', () => {
    const t = TypeX.Nullable(Type.String());
    type t = typeof t.static;
    expect(TypeGuard.IsKindOf(t, 'Nullable')).toBe(true);
    expect(Value.Check(t, null)).toBe(true);
    expect(Value.Check(t, 'abc')).toBe(true);
    expect(Value.Check(t, 123)).toBe(false);
  });
});
