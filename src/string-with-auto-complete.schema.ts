import type { StringOptions } from '@sinclair/typebox';
import { Kind, type TString } from '@sinclair/typebox';
import type { ToUnion } from './types';

type StringWithAutoComplete<T extends readonly string[]> =
  | ToUnion<T>
  | (string & {});

export interface TStringWithAutoComplete<T extends readonly string[]>
  extends TString {
  static: StringWithAutoComplete<T>;
  enum: string[];
}

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
  } as unknown as TStringWithAutoComplete<T>;
};
