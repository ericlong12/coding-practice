/**
 * Merge Intervals (Clean Implementation)
 *
 * Pattern: Sort + Sweep Merge
 * Time: O(n log n)
 * Space: O(n)
 *
 * Notes:
 * Sort by start time.
 * Expand the current window while intervals overlap.
 */

export function mergeIntervalsClean(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [];
  let [currentStart, currentEnd] = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start <= currentEnd) {
      currentEnd = Math.max(currentEnd, end);
    } else {
      merged.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
    }
  }

  merged.push([currentStart, currentEnd]);
  return merged;
}
