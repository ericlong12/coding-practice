/**
 * Palindromic Substrings
 *
 * Pattern: expand around center
 * Time: O(n^2)
 * Space: O(1)
 *
 * Notes:
 * Every palindrome grows from a center. Checking both odd and even centers
 * keeps the implementation compact and easy to reason about.
 */

export function countSubstrings(s: string): number {
  let palindromeCount = 0;

  const expand = (leftStart: number, rightStart: number): void => {
    let left = leftStart;
    let right = rightStart;

    while (left >= 0 && right < s.length && s[left] === s[right]) {
      palindromeCount += 1;
      left -= 1;
      right += 1;
    }
  };

  for (let index = 0; index < s.length; index += 1) {
    expand(index, index);
    expand(index, index + 1);
  }

  return palindromeCount;
}
