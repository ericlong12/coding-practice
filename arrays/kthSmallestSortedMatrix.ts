/**
 * Kth Smallest Element in a Sorted Matrix
 *
 * Pattern: Heap (Min Heap)
 * Time: O(k log n)
 * Space: O(n)
 *
 * Notes:
 * Push first element of each row, expand progressively.
 */

export function kthSmallestSortedMatrix(
  matrix: number[][],
  k: number
): number {
  const n = matrix.length;

  const minHeap: [number, number, number][] = [];

  for (let r = 0; r < Math.min(n, k); r++) {
    minHeap.push([matrix[r][0], r, 0]);
  }

  let result = 0;

  for (let i = 0; i < k; i++) {
    minHeap.sort((a, b) => a[0] - b[0]);
    const [value, row, col] = minHeap.shift()!;
    result = value;

    if (col + 1 < matrix[row].length) {
      minHeap.push([matrix[row][col + 1], row, col + 1]);
    }
  }

  return result;
}
