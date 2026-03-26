/**
 * Minimum Cost to Cut a Stick
 *
 * Pattern: interval dp
 * Time: O(n^3)
 * Space: O(n^2)
 *
 * Notes:
 * Classic interval DP: try every cut as the last cut.
 */

export function minCost(n: number, cuts: number[]): number {
  const arr = [0, ...cuts.sort((a, b) => a - b), n];
  const len = arr.length;

  const dp: number[][] = Array.from({ length: len }, () =>
    new Array(len).fill(0),
  );

  for (let length = 2; length < len; length++) {
    for (let left = 0; left + length < len; left++) {
      const right = left + length;
      dp[left][right] = Number.POSITIVE_INFINITY;

      for (let mid = left + 1; mid < right; mid++) {
        const cost =
          arr[right] - arr[left] +
          dp[left][mid] +
          dp[mid][right];

        dp[left][right] = Math.min(dp[left][right], cost);
      }
    }
  }

  return dp[0][len - 1];
}
