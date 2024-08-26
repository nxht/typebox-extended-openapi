import { Type, TypeGuard, type Static } from '@sinclair/typebox';
import { Merge } from '../src/merge.schema';
import { describe, test, expect } from 'bun:test';

describe('Merge', () => {
  test('base with Type.Object', () => {
    const t = Merge([
      Type.Object({ a: Type.String() }),
      Type.Object({ b: Type.Number() }),
    ]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsString(t.properties.a)).toBe(true);
    expect(TypeGuard.IsNumber(t.properties.b)).toBe(true);
  });

  test('base with properties', () => {
    const t = Merge([{ a: Type.String() }, { b: Type.Number() }]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsString(t.properties.a)).toBe(true);
    expect(TypeGuard.IsNumber(t.properties.b)).toBe(true);
  });

  test('base mixed', () => {
    const t = Merge([{ a: Type.String() }, Type.Object({ b: Type.Number() })]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsString(t.properties.a)).toBe(true);
    expect(TypeGuard.IsNumber(t.properties.b)).toBe(true);
  });

  test('base mixed 2 ', () => {
    const t = Merge([Type.Object({ a: Type.String() }), { b: Type.Number() }]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsString(t.properties.a)).toBe(true);
    expect(TypeGuard.IsNumber(t.properties.b)).toBe(true);
  });

  test('optional', () => {
    const t = Merge([
      Type.Object({ a: Type.String() }),
      Type.Object({ b: Type.Optional(Type.String()) }),
    ]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsString(t.properties.a)).toBe(true);
    expect(TypeGuard.IsOptional(t.properties.b)).toBe(true);
    expect(TypeGuard.IsString(t.properties.b)).toBe(true);
  });

  test('conflict key', () => {
    const t = Merge([
      Type.Object({ a: Type.String(), b: Type.String() }),
      Type.Object({ a: Type.Number(), c: Type.String() }),
    ]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsNumber(t.properties.a)).toBe(true);
    expect(TypeGuard.IsString(t.properties.b)).toBe(true);
    expect(TypeGuard.IsString(t.properties.c)).toBe(true);
  });

  test('conflict object 1', () => {
    const t = Merge([
      Type.Object({ a: Type.Object({ a2: Type.String() }), b: Type.String() }),
      Type.Object({ a: Type.String(), c: Type.String() }),
    ]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsString(t.properties.a)).toBe(true);
    expect(TypeGuard.IsString(t.properties.b)).toBe(true);
    expect(TypeGuard.IsString(t.properties.c)).toBe(true);
  });

  test('conflict object 2', () => {
    const t = Merge([
      Type.Object({ a: Type.String(), b: Type.String() }),
      Type.Object({ a: Type.Object({ a2: Type.String() }), c: Type.String() }),
    ]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsObject(t.properties.a)).toBe(true);
    expect(TypeGuard.IsString(t.properties.a.properties.a2)).toBe(true);
    expect(TypeGuard.IsString(t.properties.b)).toBe(true);
    expect(TypeGuard.IsString(t.properties.c)).toBe(true);
  });

  test('conflict key triple', () => {
    const t = Merge([
      Type.Object({ a: Type.String(), b: Type.String() }),
      Type.Object({ a: Type.Number(), b: Type.Number() }),
      Type.Object({ a: Type.Boolean(), d: Type.String() }),
    ]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsBoolean(t.properties.a)).toBe(true);
    expect(TypeGuard.IsNumber(t.properties.b)).toBe(true);
    expect(TypeGuard.IsString(t.properties.d)).toBe(true);
  });

  test('conflict property override', () => {
    const t = Merge([
      Type.Object({
        a: Type.String({ description: 'initial description' }),
        b: Type.String(),
      }),
      Type.Object({
        a: Type.String({ description: 'updated description' }),
        c: Type.String(),
      }),
    ]);
    type t = Static<typeof t>;
    expect(TypeGuard.IsObject(t)).toBe(true);
    expect(TypeGuard.IsString(t.properties.a)).toBe(true);
    expect(t.properties.a.description).toBe('updated description');
    expect(TypeGuard.IsString(t.properties.b)).toBe(true);
    expect(TypeGuard.IsString(t.properties.c)).toBe(true);
  });
});
