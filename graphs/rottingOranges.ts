/**
 * Rotting Oranges
 *
 * Pattern: Multi-Source BFS
 * Time: O(m * n)
 * Space: O(m * n)
 *
 * Notes:
 * Start BFS from all initially rotten oranges.
 * Each level represents one minute passing.
 */

export function rottingOranges(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const queue: [number, number][] = [];
  let freshCount = 0;
  let minutes = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      if (grid[r][c] === 1) freshCount++;
    }
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length > 0 && freshCount > 0) {
    let levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const [row, col] = queue.shift()!;

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < rows &&
          newCol < cols &&
          grid[newRow][newCol] === 1
        ) {
          grid[newRow][newCol] = 2;
          freshCount--;
          queue.push([newRow, newCol]);
        }
      }
    }

    minutes++;
  }

  return freshCount === 0 ? minutes : -1;
}
