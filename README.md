# Arithmetic parser on JavaScript


This is an arithmetic parser implemented in JavaScript. It's capable of parsing and evaluating arithmetic expressions involving the basic arithmetic operations like addition, subtraction, multiplication, division, and also more complex operations like sum, average, negate, arctangent (atan, atan2). The parser can handle variables x, y, and z in the expressions.

------------


### Features
- Evaluate arithmetic expressions.
- Handle multiple operations: +, -, *, /, sum, avg, negate, atan, atan2.
- Support for variables: x, y, z.
- Two parsing modes: regular and prefix.

------------



### Usage
Here is a simple example on how to use the parser:
```javascript
const expression = parse("2 * x - 3");
const expressionPrefix = parsePrefix("(- (* 2 x) 3)");

let result = expression.evaluate(5, 2, 3);  // evaluates "2 * 5 - 3"
let resultPrefix = expressionParser.evaluate(1, 2, 3);  // evaluates "(- (* 2 5) 3)"
console.log(result);  // Outputs: 7
console.log(resultPrefix);  // Outputs: 7
```
In this example, we first parse the expression "2x - 3" and then evaluate it with x=5, y=2, and z=3.

------------

### API
The parser exposes the following main functions:

- parse(string): Parses a string containing an arithmetic expression and returns an object representing the parsed expression.
- parsePrefix(string): Parses a string containing an arithmetic expression in [prefix notation](https://ru.wikipedia.org/wiki/Польская_запись) and returns an object representing the parsed expression.
- evaluate(x, y, z): Evaluates the parsed expression with the provided variable values. This function is a method of the object returned by parse and parsePrefix.
- toString(): outputs an expression entry in a [postfix notation](https://ru.wikipedia.org/wiki/Обратная_польская_запись)
- prefix(): outputs an expression entry in a [prefix notation](https://ru.wikipedia.org/wiki/Польская_запись)

Additionally, the parser provides the following helper functions:

- NaryOp(nameOfOperation, functionOfOperation): Factory function to create specific operation instances.
- sum(numbers): Sum the given numbers.
------------
