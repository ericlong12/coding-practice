/**
 * Shortest Bridge
 *
 * Pattern: dfs + multi-source bfs
 * Time: O(n^2)
 * Space: O(n^2)
 *
 * Notes:
 * First mark one island via DFS, then expand outward using BFS
 * until we hit the second island.
 */

export function shortestBridge(grid: number[][]): number {
  const n = grid.length;
  const queue: [number, number][] = [];
  const visited = Array.from({ length: n }, () => Array(n).fill(false));

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(r: number, c: number): void {
    if (
      r < 0 ||
      c < 0 ||
      r >= n ||
      c >= n ||
      visited[r][c] ||
      grid[r][c] === 0
    ) {
      return;
    }

    visited[r][c] = true;
    queue.push([r, c]);

    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc);
    }
  }

  let found = false;

  for (let i = 0; i < n && !found; i++) {
    for (let j = 0; j < n && !found; j++) {
      if (grid[i][j] === 1) {
        dfs(i, j);
        found = true;
      }
    }
  }

  let steps = 0;

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift()!;

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr < 0 ||
          nc < 0 ||
          nr >= n ||
          nc >= n ||
          visited[nr][nc]
        ) {
          continue;
        }

        if (grid[nr][nc] === 1) {
          return steps;
        }

        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    }

    steps++;
  }

  return -1;
}
