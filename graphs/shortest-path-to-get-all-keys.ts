/**
 * Shortest Path to Get All Keys
 *
 * Pattern: bfs + bitmask state
 * Time: O(m * n * 2^k)
 * Space: O(m * n * 2^k)
 *
 * Notes:
 * State includes position and keys collected.
 * We cannot revisit same cell with same key mask.
 */

export function shortestPathAllKeys(grid: string[]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  let startRow = 0;
  let startCol = 0;
  let totalKeys = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const char = grid[r][c];
      if (char === '@') {
        startRow = r;
        startCol = c;
      } else if (char >= 'a' && char <= 'f') {
        totalKeys++;
      }
    }
  }

  const targetMask = (1 << totalKeys) - 1;
  const queue: [number, number, number][] = [[startRow, startCol, 0]];
  const visited = new Set<string>([`${startRow},${startCol},0`]);

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let steps = 0;

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [r, c, keys] = queue.shift()!;

      if (keys === targetMask) {
        return steps;
      }

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr < 0 ||
          nc < 0 ||
          nr >= rows ||
          nc >= cols
        ) continue;

        const cell = grid[nr][nc];
        if (cell === '#') continue;

        let newKeys = keys;

        if (cell >= 'a' && cell <= 'f') {
          newKeys |= (1 << (cell.charCodeAt(0) - 'a'.charCodeAt(0)));
        }

        if (cell >= 'A' && cell <= 'F') {
          const needed = cell.charCodeAt(0) - 'A'.charCodeAt(0);
          if ((keys & (1 << needed)) === 0) continue;
        }

        const state = `${nr},${nc},${newKeys}`;
        if (!visited.has(state)) {
          visited.add(state);
          queue.push([nr, nc, newKeys]);
        }
      }
    }

    steps++;
  }

  return -1;
}
