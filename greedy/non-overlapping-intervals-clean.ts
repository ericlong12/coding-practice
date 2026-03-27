/**
 * Non-overlapping Intervals (Greedy Clean)
 *
 * Pattern: greedy + sorting
 * Time: O(n log n)
 * Space: O(1)
 *
 * Notes:
 * Always keep the interval with the smallest end time so future intervals
 * have the best chance to fit without overlap.
 */

export function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length <= 1) {
    return 0;
  }

  intervals.sort((a, b) => a[1] - b[1]);

  let removals = 0;
  let previousEnd = intervals[0][1];

  for (let index = 1; index < intervals.length; index += 1) {
    const [start, end] = intervals[index];

    if (start < previousEnd) {
      removals += 1;
    } else {
      previousEnd = end;
    }
  }

  return removals;
}
