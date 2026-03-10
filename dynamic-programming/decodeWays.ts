/**
 * Decode Ways
 *
 * Pattern: 1D Dynamic Programming
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * dp[i] represents number of ways to decode
 * substring s[0..i-1].
 */

export function decodeWays(s: string): number {
  if (s.length === 0 || s[0] === "0") return 0;

  const dp: number[] = new Array(s.length + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= s.length; i++) {
    const oneDigit = Number(s.slice(i - 1, i));
    const twoDigits = Number(s.slice(i - 2, i));

    if (oneDigit >= 1) {
      dp[i] += dp[i - 1];
    }

    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[s.length];
}
