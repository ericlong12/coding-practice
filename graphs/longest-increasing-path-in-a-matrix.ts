/**
 * Longest Increasing Path in a Matrix
 *
 * Pattern: dfs + memoization (topo dp)
 * Time: O(m * n)
 * Space: O(m * n)
 *
 * Notes:
 * Treat as DAG. DFS with memo avoids recomputation.
 */

export function longestIncreasingPath(matrix: number[][]): number {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const memo = Array.from({ length: rows }, () =>
    new Array<number>(cols).fill(0),
  );

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(r: number, c: number): number {
    if (memo[r][c] !== 0) return memo[r][c];

    let best = 1;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr < 0 ||
        nc < 0 ||
        nr >= rows ||
        nc >= cols ||
        matrix[nr][nc] <= matrix[r][c]
      ) continue;

      best = Math.max(best, 1 + dfs(nr, nc));
    }

    memo[r][c] = best;
    return best;
  }

  let result = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result = Math.max(result, dfs(r, c));
    }
  }

  return result;
}
