/**
 * Pacific Atlantic Water Flow
 *
 * Pattern: Reverse DFS (Reachability from Edges)
 * Time: O(m * n)
 * Space: O(m * n)
 *
 * Notes:
 * Instead of flowing from each cell outward,
 * start DFS from ocean borders inward.
 */

export function pacificAtlanticWaterFlow(
  heights: number[][]
): number[][] {
  const rows = heights.length;
  const cols = heights[0].length;

  const pacific = new Set<string>();
  const atlantic = new Set<string>();

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(row: number, col: number, visited: Set<string>) {
    const key = `${row},${col}`;
    visited.add(key);

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      const newKey = `${newRow},${newCol}`;

      if (
        newRow >= 0 &&
        newCol >= 0 &&
        newRow < rows &&
        newCol < cols &&
        !visited.has(newKey) &&
        heights[newRow][newCol] >= heights[row][col]
      ) {
        dfs(newRow, newCol, visited);
      }
    }
  }

  for (let col = 0; col < cols; col++) {
    dfs(0, col, pacific);
    dfs(rows - 1, col, atlantic);
  }

  for (let row = 0; row < rows; row++) {
    dfs(row, 0, pacific);
    dfs(row, cols - 1, atlantic);
  }

  const result: number[][] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const key = `${row},${col}`;
      if (pacific.has(key) && atlantic.has(key)) {
        result.push([row, col]);
      }
    }
  }

  return result;
}
