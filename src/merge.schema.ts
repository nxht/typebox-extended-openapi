import {
  Kind,
  Type,
  type ObjectOptions,
  type TObject,
  type TProperties,
} from '@sinclair/typebox';
import type { Prettify } from './types';

type TObjectOrProperties = TObject | TProperties;

type GetProperties<T extends TObjectOrProperties> = T extends TObject
  ? T['properties']
  : T;

type MergeTwoProperties<
  L extends TProperties,
  R extends TProperties,
> = Prettify<Omit<L, keyof R> & R>;

export type MergeProperties<A extends readonly TObjectOrProperties[]> =
  A extends [
    infer L extends TObjectOrProperties,
    ...infer R extends TObjectOrProperties[],
  ]
    ? MergeTwoProperties<GetProperties<L>, MergeProperties<R>>
    : // biome-ignore lint/complexity/noBannedTypes: Expected typing
      {};

export function Merge<T extends TObjectOrProperties[]>(
  T: [...T],
  objectOptions?: ObjectOptions,
): TObject<MergeProperties<T>> {
  const properties = T.map((schema) => {
    if (Kind in schema) {
      return schema.properties;
    }
    return schema;
  });

  return Type.Object(
    Object.assign({}, ...properties) as MergeProperties<T>,
    objectOptions,
  );
}
