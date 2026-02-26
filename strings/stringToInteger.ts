/**
 * String to Integer (atoi)
 *
 * Pattern: Parsing / Edge Case Handling
 * Time: O(n)
 * Space: O(1)
 */

export function stringToInteger(input: string): number {
  let index = 0;
  const length = input.length;

  while (index < length && input[index] === ' ') {
    index++;
  }

  let sign = 1;
  if (index < length && (input[index] === '+' || input[index] === '-')) {
    sign = input[index] === '-' ? -1 : 1;
    index++;
  }

  let result = 0;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  while (index < length && input[index] >= '0' && input[index] <= '9') {
    const digit = input.charCodeAt(index) - 48;

    if (result > Math.floor(INT_MAX / 10) ||
        (result === Math.floor(INT_MAX / 10) && digit > 7)) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    index++;
  }

  return result * sign;
}
