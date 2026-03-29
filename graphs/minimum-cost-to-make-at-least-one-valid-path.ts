/**
 * Minimum Cost to Make at Least One Valid Path in a Grid
 *
 * Pattern: 0-1 BFS
 * Time: O(m * n)
 * Space: O(m * n)
 *
 * Notes:
 * Directions already pointing correctly cost 0, otherwise cost 1.
 * Use deque to prioritize 0-cost edges.
 */

export function minCost(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [0, 1],   // 1
    [0, -1],  // 2
    [1, 0],   // 3
    [-1, 0],  // 4
  ];

  const dist = Array.from({ length: rows }, () =>
    new Array(cols).fill(Number.POSITIVE_INFINITY),
  );

  const deque: [number, number][] = [];
  deque.push([0, 0]);
  dist[0][0] = 0;

  while (deque.length > 0) {
    const [r, c] = deque.shift()!;

    for (let i = 0; i < 4; i++) {
      const nr = r + directions[i][0];
      const nc = c + directions[i][1];

      if (
        nr < 0 ||
        nc < 0 ||
        nr >= rows ||
        nc >= cols
      ) continue;

      const cost = grid[r][c] === i + 1 ? 0 : 1;
      const newCost = dist[r][c] + cost;

      if (newCost < dist[nr][nc]) {
        dist[nr][nc] = newCost;

        if (cost === 0) {
          deque.unshift([nr, nc]);
        } else {
          deque.push([nr, nc]);
        }
      }
    }
  }

  return dist[rows - 1][cols - 1];
}
