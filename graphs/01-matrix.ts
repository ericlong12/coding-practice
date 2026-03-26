/**
 * 01 Matrix
 *
 * Pattern: multi-source bfs
 * Time: O(m * n)
 * Space: O(m * n)
 *
 * Notes:
 * Start BFS from all 0s simultaneously to compute nearest distance.
 */

export function updateMatrix(mat: number[][]): number[][] {
  const rows = mat.length;
  const cols = mat[0].length;

  const queue: [number, number][] = [];
  const dist = Array.from({ length: rows }, () =>
    new Array(cols).fill(-1),
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (mat[r][c] === 0) {
        queue.push([r, c]);
        dist[r][c] = 0;
      }
    }
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr < 0 ||
        nc < 0 ||
        nr >= rows ||
        nc >= cols ||
        dist[nr][nc] !== -1
      ) {
        continue;
      }

      dist[nr][nc] = dist[r][c] + 1;
      queue.push([nr, nc]);
    }
  }

  return dist;
}
