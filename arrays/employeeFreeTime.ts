/**
 * Employee Free Time
 *
 * Pattern: Interval Flatten + Merge
 * Time: O(n log n)
 * Space: O(n)
 *
 * Notes:
 * Flatten all schedules into one list,
 * merge busy intervals, then extract gaps.
 */

export function employeeFreeTime(schedule: number[][][]): number[][] {
  const allIntervals: number[][] = [];

  for (const employee of schedule) {
    for (const interval of employee) {
      allIntervals.push(interval);
    }
  }

  if (allIntervals.length === 0) return [];

  allIntervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [];
  let [currentStart, currentEnd] = allIntervals[0];

  for (let i = 1; i < allIntervals.length; i++) {
    const [start, end] = allIntervals[i];

    if (start <= currentEnd) {
      currentEnd = Math.max(currentEnd, end);
    } else {
      merged.push([currentStart, currentEnd]);
      currentStart = start;
      currentEnd = end;
    }
  }

  merged.push([currentStart, currentEnd]);

  const freeTime: number[][] = [];

  for (let i = 1; i < merged.length; i++) {
    freeTime.push([merged[i - 1][1], merged[i][0]]);
  }

  return freeTime;
}
