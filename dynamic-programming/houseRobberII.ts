/**
 * House Robber II
 *
 * Pattern: 1D DP (Circular Constraint)
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Since houses form a circle, solve two linear cases:
 * exclude first house OR exclude last house.
 */

export function houseRobberII(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  function robLinear(start: number, end: number): number {
    let prev = 0;
    let curr = 0;

    for (let i = start; i <= end; i++) {
      const temp = Math.max(curr, prev + nums[i]);
      prev = curr;
      curr = temp;
    }

    return curr;
  }

  return Math.max(
    robLinear(0, nums.length - 2),
    robLinear(1, nums.length - 1)
  );
}
