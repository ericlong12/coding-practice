/**
 * Word Search
 *
 * Pattern: Backtracking (Grid DFS)
 * Time: O(m * n * 4^L)
 * Space: O(L)
 *
 * Notes:
 * Explore 4 directions. Mark visited in-place
 * and restore during backtrack.
 */

export function wordSearch(board: string[][], word: string): boolean {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(row: number, col: number, index: number): boolean {
    if (index === word.length) return true;

    if (
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols ||
      board[row][col] !== word[index]
    ) {
      return false;
    }

    const temp = board[row][col];
    board[row][col] = "#";

    const found =
      dfs(row + 1, col, index + 1) ||
      dfs(row - 1, col, index + 1) ||
      dfs(row, col + 1, index + 1) ||
      dfs(row, col - 1, index + 1);

    board[row][col] = temp;
    return found;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (dfs(row, col, 0)) return true;
    }
  }

  return false;
}
