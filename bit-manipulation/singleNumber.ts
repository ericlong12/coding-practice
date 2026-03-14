/**
 * Single Number
 *
 * Pattern: Bit Manipulation (XOR)
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * XOR cancels identical numbers:
 * a ^ a = 0
 * a ^ 0 = a
 */

export function singleNumber(nums: number[]): number {
  let result = 0;

  for (const num of nums) {
    result ^= num;
  }

  return result;
}
