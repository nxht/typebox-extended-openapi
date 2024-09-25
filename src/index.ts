import { Merge, type MergeProperties } from './merge.schema';
import { Nullable } from './nullable.schema';
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
  Nullable: Nullable,
};

export const TypeXGuard = {
  IsStringEnum: IsStringEnum,
};

export type { MergeProperties, TStringEnum, TStringWithAutoComplete };
