/**
 * Basic Calculator
 *
 * Pattern: stack + recursion
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * Handle parentheses by recursive evaluation.
 */

export function calculate(s: string): number {
  let index = 0;

  function helper(): number {
    const stack: number[] = [];
    let num = 0;
    let sign = '+';

    while (index < s.length) {
      const char = s[index];
      index++;

      if (char >= '0' && char <= '9') {
        num = num * 10 + Number(char);
      }

      if (char === '(') {
        num = helper();
      }

      if (
        (char < '0' && char !== ' ' && char !== '(') ||
        index === s.length
      ) {
        if (sign === '+') stack.push(num);
        else if (sign === '-') stack.push(-num);

        sign = char;
        num = 0;
      }

      if (char === ')') break;
    }

    return stack.reduce((a, b) => a + b, 0);
  }

  return helper();
}
