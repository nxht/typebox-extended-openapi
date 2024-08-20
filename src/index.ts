import { Merge, type MergeProperties } from './merge.schema';
import {
  IsStringEnum,
  StringEnum,
  type TStringEnum,
} from './string-enum.schema';
import {
  StringWithAutoComplete,
  type TStringWithAutoComplete,
} from './string-with-auto-complete.schema';

export const TypeX = {
  StringEnum: StringEnum,
  StringWithAutoComplete: StringWithAutoComplete,
  Merge: Merge,
};

export const TypeXGuard = {
  IsStringEnum: IsStringEnum,
};

export type { MergeProperties, TStringEnum, TStringWithAutoComplete };
