/**
 * Split Array Largest Sum
 *
 * Pattern: binary search on answer
 * Time: O(n log(sum(nums)))
 * Space: O(1)
 *
 * Notes:
 * Guess the largest allowed subarray sum, then greedily count how many
 * pieces are needed. That monotonic check makes binary search fit well.
 */

export function splitArray(nums: number[], k: number): number {
  let left = Math.max(...nums);
  let right = nums.reduce((sum, value) => sum + value, 0);

  const canSplit = (maxAllowedSum: number): boolean => {
    let partitions = 1;
    let currentSum = 0;

    for (const value of nums) {
      if (currentSum + value > maxAllowedSum) {
        partitions += 1;
        currentSum = value;
      } else {
        currentSum += value;
      }
    }

    return partitions <= k;
  };

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    if (canSplit(middle)) {
      right = middle;
    } else {
      left = middle + 1;
    }
  }

  return left;
}
