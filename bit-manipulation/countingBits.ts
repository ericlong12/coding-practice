/**
 * Counting Bits
 *
 * Pattern: DP + Bit Manipulation
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * dp[i] = dp[i >> 1] + (i & 1)
 */

export function countingBits(n: number): number[] {
  const dp: number[] = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >> 1] + (i & 1);
  }

  return dp;
}
