/**
 * Longest Common Subsequence
 *
 * Pattern: 2D Dynamic Programming
 * Time: O(m * n)
 * Space: O(m * n)
 *
 * Notes:
 * dp[i][j] represents LCS length for text1[0..i-1] and text2[0..j-1].
 */

export function longestCommonSubsequence(
  text1: string,
  text2: string
): number {
  const rows = text1.length;
  const cols = text2.length;

  const dp: number[][] = Array.from({ length: rows + 1 }, () =>
    new Array(cols + 1).fill(0)
  );

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[rows][cols];
}
