import {
  Kind,
  type StringOptions,
  type TSchema,
  TypeGuard,
  TypeRegistry,
} from '@sinclair/typebox';

export type StringEnumOptions = StringOptions;

export interface TStringEnum<T extends readonly string[]>
  extends TSchema,
    StringOptions {
  [Kind]: 'StringEnum';
  static: T[number];
  type: 'string';
  enum: T;
}

/** Creates a StringEnum type
 * @param items - The enum string tuple or enum object
 * @example const MyEnum = TypeX.StringEnum(['a', 'b', 'c'])
 */
export const StringEnum = <
  const T extends readonly string[] | Record<string, string>,
>(
  items: T,
  options: StringEnumOptions = {},
): TStringEnum<T extends readonly string[] ? T : T[keyof T][]> => {
  const { ...stringOptions } = options;

  type O = T extends readonly string[] ? T : T[keyof T][];

  function isArray(
    items: readonly string[] | Record<string, string>,
  ): items is readonly string[] {
    return Array.isArray(items);
  }

  if (isArray(items)) {
    items;
    return {
      ...stringOptions,
      enum: items,
      [Kind]: 'StringEnum',
      type: 'string',
    } as TStringEnum<O>;
  }

  const stringList = Object.values(items) as T[keyof T][];

  return {
    ...stringOptions,
    enum: stringList,
    [Kind]: 'StringEnum',
    type: 'string',
  } as TStringEnum<O>;
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
