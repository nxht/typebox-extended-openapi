import { Hint, Kind, type TSchema, TypeRegistry } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export interface TNullable<T extends TSchema> extends TSchema {
  [Kind]: 'Nullable';
  [Hint]: string;
  static: T | null;
  nullable: true;
}

/** Creates a Nullable type
 * @param subSchema - The schema to be nullable
 * @example const NullableString = TypeX.Nullable(Type.String())
 */
export const Nullable = <T extends TSchema = TSchema>(
  subSchema: T,
): TNullable<T> => {
  const { [Kind]: kind, ...options } = subSchema;
  return {
    ...options,
    [Kind]: 'Nullable',
    [Hint]: kind,
    nullable: true,
  } as unknown as TNullable<T>;
};

TypeRegistry.Set<TNullable<TSchema>>('Nullable', (schema, value) => {
  if (value === null) return true;

  const { [Kind]: kind, [Hint]: subKind, ...subSchema } = schema;

  return Value.Check({ [Kind]: subKind, ...subSchema }, value);
});
