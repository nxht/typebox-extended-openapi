export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ToUnion<T extends readonly string[]> = T[number];
