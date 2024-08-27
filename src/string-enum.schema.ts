import {
  Kind,
  type StringOptions,
  type TSchema,
  TypeGuard,
  TypeRegistry,
} from '@sinclair/typebox';
import type { ToUnion } from './types';

export type StringEnumOptions = StringOptions;

export interface TStringEnum<T extends readonly string[]>
  extends TSchema,
    StringOptions {
  [Kind]: 'StringEnum';
  static: ToUnion<T>;
  type: 'string';
  enum: T;
}

/** Creates a StringEnum type
 * @param enumStrings - The enum string tuple. Use `as const` to ensure type safety
 * @example const MyEnum = TypeX.StringEnum(['a', 'b', 'c'] as const)
 */
export const StringEnum = <T extends readonly string[]>(
  enumStrings: T,
  options: StringEnumOptions = {},
): TStringEnum<T> => {
  const { ...stringOptions } = options;

  return {
    ...stringOptions,
    enum: enumStrings,
    [Kind]: 'StringEnum',
    type: 'string',
  } as TStringEnum<T>;
};

function CheckEnum(enumValue: unknown): enumValue is string[] {
  return (
    Array.isArray(enumValue) && enumValue.every((v) => typeof v === 'string')
  );
}

export function IsStringEnum(value: unknown): value is TStringEnum<string[]> {
  return (
    TypeGuard.IsKindOf(value, 'StringEnum') &&
    value.type === 'string' &&
    CheckEnum(value.enum)
  );
}

TypeRegistry.Set<TStringEnum<string[]>>('StringEnum', (schema, value) => {
  if (typeof value !== 'string') return false;

  if (schema.enum.includes(value) || value === '') {
    return true;
  }
  return false;
});
