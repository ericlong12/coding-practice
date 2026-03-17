/**
 * Subarray Product Less Than K
 *
 * Pattern: Sliding Window (Multiplicative)
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Expand window while product < k.
 * Count all subarrays ending at right pointer.
 */

export function subarrayProductLessThanK(nums: number[], k: number): number {
  if (k <= 1) return 0;

  let product = 1;
  let left = 0;
  let count = 0;

  for (let right = 0; right < nums.length; right++) {
    product *= nums[right];

    while (product >= k) {
      product /= nums[left];
      left++;
    }

    count += right - left + 1;
  }

  return count;
}
