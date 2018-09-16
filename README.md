# Typescript

## What is typescript?

- A strict syntactical superset of JavaScript.
- Open source but developed and maintained by Microsoft.
- Compliles to JS for Node and the browser.
- Consists of three parts: _Language_, _Language Service_ and _Compiler_.

## JS Types

_Primitive values_ aren't objects. They are immutable and have no methods\*.
There are _six_ primitive types:

- null
- undefined
- boolean
- number
- string
- symbol

Everything else extends from _Object_.

## JS - Auto-boxing

When necessary, primitives are "wrapped" by identically named Objects, and then back to their primitive types again.

```js
const a = 'hello';
console.log(typeof a); // string

const b = new String('hello');
console.log(typeof b); // object

console.log(a === b); // false
console.log(typeof a === typeof b); // false
```

"primitives don't have methods but are promoted into things that do have methods as soon as you need them".

- primitive types are immutable
- direct use of _boxed_ types (i.e. `new String('wrong');) is almost always a mistake.

Typescript was the originator of a lot of newer JS features (let, const, async / await, generator functions, iterators).

## Why add types?

- Avoids potentially "unintuative" type coercion in JS
- Move some common errors from runtime to compile time.
- Great self-documentation for other devs
- Modern JS runtimes are written in typed languages (e.g. C++)

  - Consistently run functions (with same number of args / types etc.) can be passed from the interpreter (Ignition) to an optimising compiler (TurboFan).
  - This process essentially turns the JS into assembly code and caches (some portion) of that assembly code for reuse on subsequent calls - [HOT MODE].
  - As soon as types are messed with => back into slow mode.
  - TypeScript constraints help us get into hot mode and stay there.

## Implicit Typing

- The TypeScript compiler can make good guesses at types, just through assignment.
- After assigning value to a variable, you are not allowed to change the type.

```typescript
let name = 'ant';
name = 4; // ERROR: Type 'number' is not assignable to type 'string'.
```

- JS lets us do this but it's a common source of "de-optimisation" in modern runtimes. See [hidden clases](https://draft.li/blog/2016/12/22/javascript-engines-hidden-classes/).

## Explicit Typing

### Annotations

- Explicit types can be added when variables / function params are defined.

```typescript
let name: string = 'ant';
```

- This type information is known as _type annotation_.

### Casting

- Sometimes we want to add a particular type with the `as` keyword.

```typescript
let input = document.querySelector('input#field_name') as HTMLInputElement;

// Below is an alternate way to do the same thing. Doesn't mix well with JSX.
let input = <HTMLInputElement>document.querySelector('input#field_name');
```

### Function params and return

```typescript
// function login (username: string, password: string): User {
const login = (username: string, password: string): User => {
  // do stuff
};
```
