/**
 * Submatrix Sum Equals K
 *
 * Pattern: prefix sum + hashmap
 * Time: O(rows^2 * cols)
 * Space: O(cols)
 *
 * Notes:
 * Fix row boundaries and reduce to subarray sum equals k.
 */

export function numSubmatrixSumTarget(
  matrix: number[][],
  target: number,
): number {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let result = 0;

  for (let top = 0; top < rows; top++) {
    const colSums = new Array<number>(cols).fill(0);

    for (let bottom = top; bottom < rows; bottom++) {
      for (let c = 0; c < cols; c++) {
        colSums[c] += matrix[bottom][c];
      }

      const map = new Map<number, number>();
      map.set(0, 1);

      let currentSum = 0;

      for (const sum of colSums) {
        currentSum += sum;

        if (map.has(currentSum - target)) {
          result += map.get(currentSum - target)!;
        }

        map.set(currentSum, (map.get(currentSum) ?? 0) + 1);
      }
    }
  }

  return result;
}
