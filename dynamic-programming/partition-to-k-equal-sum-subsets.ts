/**
 * Partition to K Equal Sum Subsets
 *
 * Pattern: bitmask dp + backtracking
 * Time: O(n * 2^n)
 * Space: O(2^n)
 *
 * Notes:
 * Use bitmask to represent used elements and memoize states.
 */

export function canPartitionKSubsets(nums: number[], k: number): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % k !== 0) return false;

  const target = total / k;
  const n = nums.length;
  const memo = new Map<number, boolean>();

  function dfs(usedMask: number, currSum: number, count: number): boolean {
    if (count === k - 1) return true;

    if (currSum === target) {
      const result = dfs(usedMask, 0, count + 1);
      memo.set(usedMask, result);
      return result;
    }

    if (memo.has(usedMask)) return memo.get(usedMask)!;

    for (let i = 0; i < n; i++) {
      if ((usedMask & (1 << i)) !== 0) continue;

      if (currSum + nums[i] > target) continue;

      if (
        dfs(usedMask | (1 << i), currSum + nums[i], count)
      ) {
        return true;
      }
    }

    memo.set(usedMask, false);
    return false;
  }

  return dfs(0, 0, 0);
}
