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

...but excess properties are allowed: ???

```typescript
let bike3 = {
  make: 'Specialized',
  model: 'Hardrock Sport',
  year: 2008,
  color: { r: 192, g: 192, b: 192 }
};
washBike(bike3); // No error
```

## Interfaces

Interfaces allow us to define a structure and refer to it by name.

```typescript
interface Car {
  make: string;
  model: string;
  year: number;
}

let myCar: Car = { make: 'Honda', model: 'Accord', year: 1992 };
let lisasCar: Car = { make: 'Ford', model: 'Monster Truck', year: 2016 };

function carCageMatch(car1: Car, car2: Car) {
  //...
}
```

Interfaces are extensible.

```typescript
interface Car {
  make: string;
  model: string;
  year: number;
}

interface Car {
  color: string;
}

let lisasCar: Car = {
  make: 'Ford',
  model: 'Monster Truck',
  year: 2016,
  color: '#fff' // ✅
};
```

Interfaces don't compile to any JS code.
DRY type definition makes for easier refactoring.
Can be exported, just like everything else.

## The `any` type

- Allows for a value of any kind.
- How every mutable JS value is treated.
- Useful for migrating code from JS -> TS.
- Also a `never` type.

```typescript
let age = 34;
let myAge = age as any;
myAge = '35';
```

## Classes

- Need to define shape of classes up front, like Interfaces.
- Constructor is used for creating new intances.
- Should add type annotations properties **AND** function arguments.

```typescript
class Car {
  make: string
  model: string
  year: number
  constructor(make: string,
              model: string,
              year: number) {
    this.make: make;
    this.model: model;
    this.year: year;
  }

  startEngine() {
    return 'VROOM!';
  }
}

const myCar = new Car('Specialized', 'Hardrock Sport', 2008);
```

### Mixins

- Mixins are abstract classes or "templates for classes".

```js
const AsJSON = x =>
  class extends x {
    asJSON() {
      return JSON.stringify(this);
    }
  };

class Person extends AsJSON(Object) {
  constructor(name) {
    super();
    this.name = name;
  }
}

const me = new Person('Ant');
console.log(me.asJSON()); // { "name": "Ant" }
```

# Enums

- Enums are an ordered set of items / members
- Each has a name and a value
- Often we don't care about the value (beyond an equality check)
- Get members via:

```typescript
enum AcctType {
  Checkings,
  Savings,
  MoneyMarket
}

type Acct = [number, AcctType];

let account: Acct = [9142.14, AccType.Checking];
```

### Enums in TS and JS

```typescript
enum Suit {
  Club,
  Diamond,
  Heart,
  Spade
}
```

...compiles to:

```js
var Suit;
(function(Suit) {
  Suit[(Suit['Club'] = 0)] = 'Club';
  Suit[(Suit['Diamond'] = 1)] = 'Diamond';
  Suit[(Suit['Heart'] = 2)] = 'Heart';
  Suit[(Suit['Spade'] = 3)] = 'Spade';
})(Suit || (Suit = {}));

console.log(Suit); /* { '0': 'Club',
                        '1': 'Diamond',
                        '2': 'Heart',
                        '3': 'Spade',
                        Club: 0,
                        Diamond: 1,
                        Heart: 2,
                        Spade: 3 } */
```

So to get the number of memebers of an enum: `Object.keys(Suit).length / 2`.

# Arrays

- By default, arrays in TS act the same as they do in JS.

```typescript
let a = [];
a.push(5);
a.push('some string');
```

- Adding a type constraint helps us to keep contents consistent.

```typescript
let nums = number[]= [1, 2, 3];
```

- When initializing class properties with empty arrays, provide a type (otherwise it will default to `never`)

```typescript
class ShoppingCart {
  items = [];
  constructor() {
    this.items.push(5);
  }
}
// ERROR: Argument of type '5' is
// not assignable to parameter of
// type 'never'
```

```typescript
class ShoppingCart {
  items: number[] = [];
  constructor() {
    this.items.push(5);
  }
}
```

## Tuples

- Tuples are arrays of fixed length.
- Typically represent values that are related in some way.
- Consumers need to know about order.
- Shines with destructured assignment.
- Will check order recursively in some cases.

```typescript
let dependency: [string, number];
dependency = ['react', 16];

let dependencies: [string, number][] = [];
dependencies.push(dependency); ✅
dependencies.push(['webpack', 3]); ✅
dependencies.push(['typescript', '2.5']); ❌
```

## Type Aliases

- Sometimes an interface isn't the best way to describe a structure.
- We can use the `type` keyword to define a type alias.

```typescript
type Color = [number, number, number];
let Red: Color = [255, 0, 0];
```

- We can export `type`s and `interface`s, so we can consume them in other modules!

## Functions

- Functions have types, just like any other value.

```typescript
let login: (username: string, password: string) => User; // a function type
login = (username, password) => new User(); // a function value
```

- Interfaces aren't just for describing object structures
- Here's one describing a function type:

```typescript
interface ClickListener {
  (this: Window, e: MouseEvent): void;
}

const myLisener: ClickListener = e => {
  console.log('mouse clicked!', e);
};

addEventListener('click', myListener); ✅

myListener(new MouseEvent('click')); ❌
// The `this` context of type `void` is not
// assignable to method's `this` of type `Window`.
```

- Note the `this`property in the interface. It ensures that the function is bound to the appropriate context.

### Functions: Required Parameters / Optional Parameters

- Unless you say otherwise, TS assumes every argument is required.

```typescript
function createTwitterPost(body: string, username: string, imageUrl: URL) {
  // ...
}

createTwitterPost('Hello World!', '4ntm3d'); ❌
// expected 3 arguments and got 2...
```

- We can fix this with an optional parameter (by using a `?`)
- Can also add a default argument (with `=`)

```typescript
function createTwitterPost(body: string, username: string = '4antm3d', imageUrl?: URL) {
  // ...
}

createTwitterPost('Hello World!', '4ntm3d'); ✅
```

### Functions: Rest Params

- A (boundless) group of optional parameters

```typescript
function orderSandwich(bread: string, name: string, ...toppings: string[]) {
  // ...
}

orderSandwich('Malted Bloomer', 'Salad'); ✅
orderSandwich('Wheat', 'Veggie', 'Mustard', 'Pickles'); ✅
```
