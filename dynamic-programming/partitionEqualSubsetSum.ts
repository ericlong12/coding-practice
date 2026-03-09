/**
 * Partition Equal Subset Sum
 *
 * Pattern: 1D Dynamic Programming (Subset Sum)
 * Time: O(n * target)
 * Space: O(target)
 *
 * Notes:
 * Reduce to subset sum problem.
 * Use 1D dp for space optimization.
 */

export function partitionEqualSubsetSum(nums: number[]): boolean {
  const total = nums.reduce((sum, n) => sum + n, 0);

  if (total % 2 !== 0) return false;

  const target = total / 2;
  const dp: boolean[] = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let sum = target; sum >= num; sum--) {
      dp[sum] = dp[sum] || dp[sum - num];
    }
  }

  return dp[target];
}
