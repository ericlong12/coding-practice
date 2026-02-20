/**
 * Bucket Sort Approach
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function topKFrequent(nums: number[], k: number): number[] {
  const count = new Map<number, number>();
  const buckets: number[][] = Array(nums.length + 1)
    .fill(null)
    .map(() => []);

  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }

  for (const [num, freq] of count.entries()) {
    buckets[freq].push(num);
  }

  const result: number[] = [];

  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    for (const num of buckets[i]) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
}
