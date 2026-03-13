/**
 * Non-overlapping Intervals
 *
 * Pattern: Greedy (Sort by End Time)
 * Time: O(n log n)
 * Space: O(1)
 *
 * Notes:
 * Always keep the interval with smaller end time
 * to maximize space for future intervals.
 */

export function nonOverlappingIntervals(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  intervals.sort((a, b) => a[1] - b[1]);

  let removals = 0;
  let previousEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < previousEnd) {
      removals++;
    } else {
      previousEnd = intervals[i][1];
    }
  }

  return removals;
}
