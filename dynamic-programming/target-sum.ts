/**
 * Target Sum
 *
 * Pattern: dp (subset sum transformation)
 * Time: O(n * sum)
 * Space: O(sum)
 *
 * Notes:
 * Convert to subset sum:
 * find count of subsets with sum = (target + totalSum) / 2
 */

export function findTargetSumWays(nums: number[], target: number): number {
  const totalSum = nums.reduce((acc, num) => acc + num, 0);

  if ((target + totalSum) % 2 !== 0) return 0;

  const subsetSum = (target + totalSum) / 2;
  if (subsetSum < 0) return 0;

  const dp = new Array<number>(subsetSum + 1).fill(0);
  dp[0] = 1;

  for (const num of nums) {
    for (let s = subsetSum; s >= num; s--) {
      dp[s] += dp[s - num];
    }
  }

  return dp[subsetSum];
}
