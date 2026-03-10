/**
 * Burst Balloons
 *
 * Pattern: Interval DP
 * Time: O(n^3)
 * Space: O(n^2)
 *
 * Notes:
 * dp[left][right] represents max coins obtainable
 * from bursting balloons between left and right (exclusive).
 */

export function burstBalloons(nums: number[]): number {
  const n = nums.length;
  const balloons = [1, ...nums, 1];

  const dp: number[][] = Array.from({ length: n + 2 }, () =>
    new Array(n + 2).fill(0)
  );

  for (let length = 2; length < n + 2; length++) {
    for (let left = 0; left + length < n + 2; left++) {
      const right = left + length;

      for (let mid = left + 1; mid < right; mid++) {
        const coins =
          balloons[left] * balloons[mid] * balloons[right] +
          dp[left][mid] +
          dp[mid][right];

        dp[left][right] = Math.max(dp[left][right], coins);
      }
    }
  }

  return dp[0][n + 1];
}
