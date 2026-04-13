/**
 * Knight Probability in Chessboard
 *
 * Pattern: dp (probability)
 * Time: O(k * n^2)
 * Space: O(n^2)
 *
 * Notes:
 * At each move distribute probability across 8 directions.
 */

export function knightProbability(
  n: number,
  k: number,
  row: number,
  column: number,
): number {
  let dp = Array.from({ length: n }, () =>
    new Array<number>(n).fill(0),
  );

  dp[row][column] = 1;

  const moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2],
  ];

  for (let step = 0; step < k; step++) {
    const next = Array.from({ length: n }, () =>
      new Array<number>(n).fill(0),
    );

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (dp[r][c] === 0) continue;

        for (const [dr, dc] of moves) {
          const nr = r + dr;
          const nc = c + dc;

          if (nr >= 0 && nc >= 0 && nr < n && nc < n) {
            next[nr][nc] += dp[r][c] / 8;
          }
        }
      }
    }

    dp = next;
  }

  let result = 0;

  for (const rowArr of dp) {
    for (const val of rowArr) {
      result += val;
    }
  }

  return result;
}
