/**
 * Sliding Window Maximum (Deque)
 *
 * Pattern: monotonic deque
 * Time: O(n)
 * Space: O(k)
 *
 * Notes:
 * Maintain decreasing deque of indices. Front is always max.
 */

export function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    while (
      deque.length > 0 &&
      nums[deque[deque.length - 1]] <= nums[i]
    ) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
