import { Kind, type StringOptions, type TString } from '@sinclair/typebox';
import type { ToUnion } from './types';

type StringWithAutoComplete<T extends readonly string[]> =
  | ToUnion<T>
  | (string & {});

export interface TStringWithAutoComplete<T extends readonly string[]>
  extends TString {
  static: StringWithAutoComplete<T>;
  enum: T;
}
/** Creates a String type with type auto complete
 * - Unlike `StringEnum`, this type doesn't validate if the value is in the enum.
 */
export const StringWithAutoComplete = <T extends readonly string[]>(
  enumStrings: T,
  options: StringOptions = {},
): TStringWithAutoComplete<T> => {
  const { ...stringOptions } = options;

  return {
    ...stringOptions,
    enum: enumStrings,
    [Kind]: 'String',
    type: 'string',
  } as TStringWithAutoComplete<T>;
};
