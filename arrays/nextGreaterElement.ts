/**
 * Next Greater Element I
 *
 * Pattern: Monotonic Stack
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * Use a decreasing stack to track numbers whose
 * next greater element hasn't been found yet.
 */

export function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const stack: number[] = [];
  const nextGreater = new Map<number, number>();

  for (const num of nums2) {
    while (stack.length && num > stack[stack.length - 1]) {
      nextGreater.set(stack.pop()!, num);
    }
    stack.push(num);
  }

  return nums1.map(num => nextGreater.get(num) ?? -1);
}
