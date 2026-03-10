/**
 * Maximum Product Subarray
 *
 * Pattern: DP (Track Min and Max)
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Negative numbers can flip signs,
 * so track both current max and min.
 */

export function maximumProductSubarray(nums: number[]): number {
  let currentMax = nums[0];
  let currentMin = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const value = nums[i];

    if (value < 0) {
      [currentMax, currentMin] = [currentMin, currentMax];
    }

    currentMax = Math.max(value, currentMax * value);
    currentMin = Math.min(value, currentMin * value);

    globalMax = Math.max(globalMax, currentMax);
  }

  return globalMax;
}
