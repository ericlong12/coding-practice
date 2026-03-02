/**
 * Number of Islands
 *
 * Pattern: DFS (Grid Traversal)
 * Time: O(m * n)
 * Space: O(m * n) worst case (recursion stack)
 *
 * Notes:
 * Traverse each cell. When land is found, run DFS
 * to mark the entire island as visited.
 */

export function numberOfIslands(grid: string[][]): number {
  if (grid.length === 0) return 0;

  let islandCount = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(row: number, col: number): void {
    if (
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols ||
      grid[row][col] !== "1"
    ) {
      return;
    }

    grid[row][col] = "0";

    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        islandCount++;
        dfs(row, col);
      }
    }
  }

  return islandCount;
}
