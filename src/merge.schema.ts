import {
  Kind,
  type ObjectOptions,
  type TObject,
  type TProperties,
  Object as TypeObject,
} from '@sinclair/typebox';
import type { Prettify } from './types';

type TObjectOrProperties = TObject | TProperties;

type GetTProperties<T extends TObjectOrProperties> = T extends TObject
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
    ? MergeTwoProperties<GetTProperties<L>, MergeProperties<R>>
    : // biome-ignore lint/complexity/noBannedTypes: Expected
      {};

/** Creates a Merge object type
 * - Accepts both `Type.Object` and its properties
 * - Similar to `Type.Intersect` but uses merged properties instead of `allOf`
 * - Unlike `Type.Composite`, if there's key conflict, the right-most schema will be used
 */
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

  return TypeObject(
    Object.assign({}, ...properties) as MergeProperties<T>,
    objectOptions,
  );
}
