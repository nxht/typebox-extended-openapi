# Typebox Extended for OpenAPI

Collection of custom [@sinclair/typebox](https://github.com/sinclairzx81/typebox) schema, primarily for OpenAPI specification.

## Install 
```bash
$ npm install @nxht/typebox-extended-openapi
```
## Types


### StringEnum

Similar to `Type.Enum` but
- Only accepts string.
- Uses JSONSchema `enum` keyword instead of `anyOf` for OpenAPI compatibility.
- Unlike using [Type.Unsafe](https://github.com/sinclairzx81/typebox?tab=readme-ov-file#unsafe-types), this validates if the value is in the enum list.

```ts
import { TypeX, TypeXGuard } from '@nxht/typebox-extended-openapi';
import { Value } from '@sinclair/typebox/value';

const T = TypeX.StringEnum(['a', 'b', 'c']);
// Json Schema
// const T = {
//   type: "string",
//   enum: [ "a", "b", "c" ],
// }

type T = Static<typeof T>;
// type T = 'a' | 'b' | 'c'

Value.Check(T, 'a') // true
Value.Check(T, 'd') // false

// TypeGuard for StringEnum
TypeXGuard.IsStringEnum(T); // true
```

### StringWithAutoComplete

Similar to `TypeX.StringEnum` but doesn't validate if the value is in the enum list.

```ts
import { TypeX, TypeXGuard } from '@nxht/typebox-extended-openapi';

const T = TypeX.StringWithAutoComplete(['a', 'b', 'c']);
// Json Schema
// const T = {
//   type: "string",
//   enum: [ "a", "b", "c" ],
// }

type T = Static<typeof T>;
// type T = "a" | "b" | "c" | (string & {})

Value.Check(T, 'a') // true
Value.Check(T, 'd') // true
```


### Nullable

- Makes a schema nullable
- Unlike `Type.Union([Type.Null(), schema])`, this emit JSONSchema `nullable: true` instead of using `anyOf`
- Unlike using [Type.Unsafe](https://github.com/sinclairzx81/typebox?tab=readme-ov-file#unsafe-types), this schema doesn't emit error if the value is null

#### Known limitations
- `TypeGuard` doesn't work as this has `Nullable` schema type

```ts
import { TypeX, TypeXGuard } from '@nxht/typebox-extended-openapi';
import { Value } from '@sinclair/typebox/value';

const T = TypeX.Nullable(Type.String());
// Json Schema
// const T = {
//   type: "string",
//   nullable: true
// }

type T = Static<typeof T>;
// type T = string | null

Value.Check(T, 'a') // true
Value.Check(T, null) // true
Value.Check(T,  1) // false
```


### Merge

Merge multiple Typebox schema into one
- Unlike `Type.Intersect` or `Type.Composite`, if there's key conflict, the right-most schema will be used.
- Unlike `Type.Intersect`, the result schema will have merged properties instead of `allOf` which could be better for OpenAPI specification readability.
- Much faster type inference than `Type.Composite` especially for large object.

```ts
import { Type, type Static } from '@sinclair/typebox';
import { TypeX } from '@nxht/typebox-extended-openapi';

const A = Type.Object({
  a: Type.Union([Type.String(), Type.Number()]),
}); 
// type A = { a: string | number }
const B = Type.Object({
  a: Type.Union([Type.String(), Type.Boolean()]),
  b: Type.String(),
});
// type B = { a: string | boolean, b: string }

const TIntersect = Type.Intersect([A, B]);
type TIntersect = Static<typeof TIntersect>;
// type TIntersect = { a: string | number } & { a: string | boolean, b: string } 

const TComposite = Type.Composite([A, B]);
type TComposite = Static<typeof TComposite>;
// type TIntersect = { a: string, b: string }

const TMerge = TypeX.Merge([A, B]);
type TMerge = Static<typeof TMerge>;
// type TIntersect = { a: string | boolean, b: string }
```