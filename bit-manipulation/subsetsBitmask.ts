/**
 * Subsets (Bitmask)
 *
 * Pattern: Bitmask Enumeration
 * Time: O(n * 2^n)
 * Space: O(n)
 *
 * Notes:
 * Each number from 0 → (2^n - 1) represents a subset.
 */

export function subsetsBitmask(nums: number[]): number[][] {
  const result: number[][] = [];
  const total = 1 << nums.length;

  for (let mask = 0; mask < total; mask++) {
    const subset: number[] = [];

    for (let i = 0; i < nums.length; i++) {
      if (mask & (1 << i)) {
        subset.push(nums[i]);
      }
    }

    result.push(subset);
  }

  return result;
}
