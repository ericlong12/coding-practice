/**
 * Edit Distance
 *
 * Pattern: 2D Dynamic Programming
 * Time: O(m * n)
 * Space: O(m * n)
 *
 * Notes:
 * dp[i][j] represents minimum operations
 * to convert word1[0..i-1] to word2[0..j-1].
 */

export function editDistance(
  word1: string,
  word2: string
): number {
  const rows = word1.length;
  const cols = word2.length;

  const dp: number[][] = Array.from({ length: rows + 1 }, () =>
    new Array(cols + 1).fill(0)
  );

  for (let i = 0; i <= rows; i++) dp[i][0] = i;
  for (let j = 0; j <= cols; j++) dp[0][j] = j;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          Math.min(
            dp[i - 1][j],     // delete
            dp[i][j - 1],     // insert
            dp[i - 1][j - 1]  // replace
          ) + 1;
      }
    }
  }

  return dp[rows][cols];
}
