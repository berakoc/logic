# Logic
## What is Logic?
Logic is a library for handling logical operations with functional programming.

## Installation
To use with node:
```bash
npm install lgc
```
To access the library:
```js
const lgc = require('lgc')
```

## Usage
In the heart of the library, there lies `Logic` function. Not to be confused, it is not a constructor. However it is the function that we use to create logical fragments. You can import `Logic` directly from library:
```js
const { Logic } = require('lgc')
```
Logic is a function that utilises functional chaining:
```js
const amIHappy = Logic(isTodayHoliday()).or(isWeatherSunny()).value
```
Logic also supports autoboxing `Logic objects`. Hence you have to use `value` property when you want to get the boolean value since each operation returns another `Logic Object` instead of `Boolean` value:
```js
const result = Logic(Logic(true).xor(false)).value
```
`Logic` supports 4 basic logical operators: `and`, `or`, `xor` and `not`
### `not` Operator
Not operator is a special case. It is the only `unary` function. Using it is a little bit different than others:
```js
const { __ } = require('lgc')
const gte = (x, y) => x >= y
const result = Logic(__, gte(3, 5)).value
```
`__` is a special object which contains one key as `@@logical/not`. When it is used as first parameter, Logic function -instead of returning Logic object- returns the result of `not` operation. Also you can use `not` as a normal operator. However keep in mind that using `not` explicitly will remove early value which comes from the function chain. Because of that I highly discourage you from using it explicitly.
```js
// Even though we have true as our previous value, it will be discarded in not operation
const isTrue = Logic(true).not(false).value
```
## License
The project is licensed under MIT Open-source License.
