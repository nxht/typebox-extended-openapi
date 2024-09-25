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
- Unlike using [Type.Unsafe](https://github.com/sinclairzx81/typebox?tab=readme-ov-file#unsafe-types), this Validates if the value is in the enum list.

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
- Unlike `Type.Intersect`, the result schema will have merged properties instead of `allOf` which could be better for OpenAPI specification readability.
- Unlike `Type.Composite`, if there's key conflict, the right-most schema will be used. Also, much faster type inference.

```ts
import { Type, type Static } from '@sinclair/typebox';
import { TypeX } from '@nxht/typebox-extended-openapi';

const T = TypeX.Merge([
  Type.Object({ a: Type.String() }),
  Type.Object({ a: Type.Number(), b: Type.String() }),
]);

type T = Static<typeof T>;
// type T = {
//   a: number;
//   b: string;
// }
```