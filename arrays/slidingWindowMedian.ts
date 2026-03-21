/**
 * Sliding Window Median
 *
 * Pattern: Two Heaps
 * Time: O(n log k)
 * Space: O(k)
 *
 * Notes:
 * Maintain balance between maxHeap and minHeap.
 */

export function slidingWindowMedian(nums: number[], k: number): number[] {
  const result: number[] = [];

  const maxHeap: number[] = [];
  const minHeap: number[] = [];

  function rebalance(): void {
    if (maxHeap.length > minHeap.length + 1) {
      minHeap.push(maxHeap.shift()!);
    } else if (minHeap.length > maxHeap.length) {
      maxHeap.push(minHeap.shift()!);
    }

    maxHeap.sort((a, b) => b - a);
    minHeap.sort((a, b) => a - b);
  }

  function add(num: number): void {
    if (maxHeap.length === 0 || num <= maxHeap[0]) {
      maxHeap.push(num);
    } else {
      minHeap.push(num);
    }

    maxHeap.sort((a, b) => b - a);
    minHeap.sort((a, b) => a - b);

    rebalance();
  }

  function remove(num: number): void {
    let idx = maxHeap.indexOf(num);
    if (idx !== -1) {
      maxHeap.splice(idx, 1);
    } else {
      idx = minHeap.indexOf(num);
      minHeap.splice(idx, 1);
    }

    rebalance();
  }

  function getMedian(): number {
    if (k % 2 === 1) return maxHeap[0];
    return (maxHeap[0] + minHeap[0]) / 2;
  }

  for (let i = 0; i < nums.length; i++) {
    add(nums[i]);

    if (i >= k - 1) {
      result.push(getMedian());
      remove(nums[i - k + 1]);
    }
  }

  return result;
}
