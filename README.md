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
