/**
 * Basic Calculator II
 *
 * Pattern: stack + string parsing
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * Build the current number as we scan. Apply the previous operator when we
 * hit the next operator. Multiplication and division are resolved immediately
 * so the final stack only needs a sum.
 */

export function calculate(expression: string): number {
  const stack: number[] = [];
  let currentNumber = 0;
  let operation = "+";

  for (let index = 0; index < expression.length; index += 1) {
    const character = expression[index];

    if (character >= "0" && character <= "9") {
      currentNumber = currentNumber * 10 + Number(character);
    }

    const isOperator = character !== " " && (character < "0" || character > "9");
    const isLastCharacter = index === expression.length - 1;

    if (isOperator || isLastCharacter) {
      if (operation === "+") {
        stack.push(currentNumber);
      } else if (operation === "-") {
        stack.push(-currentNumber);
      } else if (operation === "*") {
        stack.push(stack.pop()! * currentNumber);
      } else if (operation === "/") {
        const previousNumber = stack.pop()!;
        stack.push(Math.trunc(previousNumber / currentNumber));
      }

      operation = character;
      currentNumber = 0;
    }
  }

  let total = 0;

  for (const value of stack) {
    total += value;
  }

  return total;
}
