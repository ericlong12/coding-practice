/**
 * N-Queens
 *
 * Pattern: Backtracking with Constraints
 * Time: O(n!)
 * Space: O(n)
 *
 * Notes:
 * Track used columns and diagonals
 * to ensure no conflicts.
 */

export function nQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = Array.from({ length: n }, () =>
    new Array(n).fill(".")
  );

  const columns = new Set<number>();
  const diag1 = new Set<number>();
  const diag2 = new Set<number>();

  function backtrack(row: number): void {
    if (row === n) {
      result.push(board.map(r => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (
        columns.has(col) ||
        diag1.has(row - col) ||
        diag2.has(row + col)
      ) {
        continue;
      }

      columns.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      board[row][col] = "Q";

      backtrack(row + 1);

      board[row][col] = ".";
      columns.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0);
  return result;
}
