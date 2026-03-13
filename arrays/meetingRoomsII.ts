/**
 * Meeting Rooms II
 *
 * Pattern: Min Heap (Priority Queue)
 * Time: O(n log n)
 * Space: O(n)
 *
 * Notes:
 * Sort by start time.
 * Use min heap to track earliest ending meeting.
 */

export function meetingRoomsII(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  intervals.sort((a, b) => a[0] - b[0]);

  const minHeap: number[] = [];

  for (const interval of intervals) {
    const [start, end] = interval;

    minHeap.sort((a, b) => a - b);

    if (minHeap.length > 0 && minHeap[0] <= start) {
      minHeap.shift();
    }

    minHeap.push(end);
  }

  return minHeap.length;
}
