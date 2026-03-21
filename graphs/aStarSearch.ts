/**
 * A* Search (Grid Shortest Path)
 *
 * Pattern: Graph + Heuristic (Priority Queue)
 * Time: O(E log V)
 * Space: O(V)
 *
 * Notes:
 * Uses Manhattan distance as heuristic.
 */

type Node = [number, number];

export function aStarSearch(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const target: Node = [rows - 1, cols - 1];

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function heuristic(r: number, c: number): number {
    return Math.abs(r - target[0]) + Math.abs(c - target[1]);
  }

  const minHeap: [number, number, number][] = [[0, 0, 0]]; // [f, r, c]
  const costMap = new Map<string, number>();
  costMap.set("0,0", 0);

  while (minHeap.length > 0) {
    minHeap.sort((a, b) => a[0] - b[0]);
    const [_, r, c] = minHeap.shift()!;

    if (r === target[0] && c === target[1]) {
      return costMap.get(`${r},${c}`)!;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr < 0 || nc < 0 ||
        nr >= rows || nc >= cols ||
        grid[nr][nc] === 1
      ) continue;

      const newCost = costMap.get(`${r},${c}`)! + 1;
      const key = `${nr},${nc}`;

      if (!costMap.has(key) || newCost < costMap.get(key)!) {
        costMap.set(key, newCost);
        const priority = newCost + heuristic(nr, nc);
        minHeap.push([priority, nr, nc]);
      }
    }
  }

  return -1;
}
