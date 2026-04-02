/**
 * Maximal Rectangle
 *
 * Pattern: dp + monotonic stack
 * Time: O(m * n)
 * Space: O(n)
 *
 * Notes:
 * Treat each row as histogram and reuse largest rectangle in histogram logic.
 */

export function maximalRectangle(matrix: string[][]): number {
  if (matrix.length === 0) return 0;

  const cols = matrix[0].length;
  const heights = new Array<number>(cols).fill(0);

  let maxArea = 0;

  function largestRectangle(hist: number[]): number {
    const stack: number[] = [];
    let best = 0;

    for (let i = 0; i <= hist.length; i++) {
      const current = i === hist.length ? 0 : hist[i];

      while (
        stack.length > 0 &&
        hist[stack[stack.length - 1]] > current
      ) {
        const h = hist[stack.pop()!];
        const w =
          stack.length === 0
            ? i
            : i - stack[stack.length - 1] - 1;

        best = Math.max(best, h * w);
      }

      stack.push(i);
    }

    return best;
  }

  for (const row of matrix) {
    for (let c = 0; c < cols; c++) {
      heights[c] = row[c] === '1' ? heights[c] + 1 : 0;
    }

    maxArea = Math.max(maxArea, largestRectangle(heights));
  }

  return maxArea;
}
