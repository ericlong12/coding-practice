/**
 * Search Insert Position
 *
 * Pattern: Binary Search
 * Time: O(log n)
 * Space: O(1)
 *
 * Notes:
 * Standard binary search, but returning the insertion
 * index when the target is not found.
 */

export function searchInsertPosition(sorted: number[], target: number): number {
  let left = 0;
  let right = sorted.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (sorted[mid] === target) return mid;

    if (sorted[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
