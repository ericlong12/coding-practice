/**
 * Distinct Subsequences
 *
 * Pattern: Dynamic Programming
 * Time: O(m * n)
 * Space: O(n)
 *
 * Notes:
 * dp[j] represents number of ways to match target[0..j]
 * using characters processed so far in source.
 */

export function distinctSubsequences(source: string, target: string): number {
  const dp: number[] = new Array(target.length + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < source.length; i++) {
    for (let j = target.length - 1; j >= 0; j--) {
      if (source[i] === target[j]) {
        dp[j + 1] += dp[j];
      }
    }
  }

  return dp[target.length];
}
