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

## Type Systems and Type Equivalence

```typescript
function validateInputField(input: HTMLInputElement) {
  // do stuff
}

validateInputField(x);
```

1. **Nominal Type Systems** check a type based on whether something is an `instance` of a `class` / `type` named "HTMLInputElement".
2. **Structural Type Systems** only care about the _shape_ of an object. **THIS IS HOW TYPESCRIPT WORKS**

## Object Shapes

When we talk about the shape of an object, we're referring to the names of properties and the types of their values:

```typescript
let myBike: { make: string; model: string; year: number };

myBike = {
  make: 'Specialized',
  model: 'Hardrock Sport',
  year: 2008
};
```

For example:

```typescript
function washBike(bike: { make: string; model: string; year: number }) {
  // do stuff
}

let bike1 = {
  make: 'Specialized',
  model: 'Hardrock Sport',
  year: 2008
};
washBike(bike1); // No error
```

TS will throw an error when receives a shape missing a property:

```typescript
let bike2 = {
  make: 'Specialized',
  model: 'Hardrock Sport'
};
washBike(bike2); // Throws error
```

...but excess properties are allowed:

```typescript
let bike3 = {
  make: 'Specialized',
  model: 'Hardrock Sport',
  year: 2008,
  color: { r: 192, g: 192, b: 192 }
};
washBike(bike3); // No error
```
