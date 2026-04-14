/**
 * Swim in Rising Water
 *
 * Pattern: Dijkstra (minimize max edge weight)
 * Time: O(n^2 log n)
 * Space: O(n^2)
 *
 * Notes:
 * The cost of a path is the maximum elevation seen.
 * Classic "minimize the maximum" using Dijkstra.
 */

type Node = [number, number, number]; // [time, r, c]

class MinHeap {
  private data: Node[] = [];

  push(val: Node): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): Node | undefined {
    if (this.data.length === 0) return undefined;

    const top = this.data[0];
    const last = this.data.pop()!;

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  get size(): number {
    return this.data.length;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p][0] <= this.data[i][0]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private bubbleDown(i: number): void {
    const n = this.data.length;

    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && this.data[l][0] < this.data[smallest][0]) {
        smallest = l;
      }

      if (r < n && this.data[r][0] < this.data[smallest][0]) {
        smallest = r;
      }

      if (smallest === i) break;

      [this.data[i], this.data[smallest]] = [
        this.data[smallest],
        this.data[i],
      ];

      i = smallest;
    }
  }
}

export function swimInWater(grid: number[][]): number {
  const n = grid.length;

  const visited = Array.from({ length: n }, () =>
    new Array<boolean>(n).fill(false),
  );

  const heap = new MinHeap();
  heap.push([grid[0][0], 0, 0]);

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (heap.size > 0) {
    const [time, r, c] = heap.pop()!;

    if (visited[r][c]) continue;
    visited[r][c] = true;

    if (r === n - 1 && c === n - 1) {
      return time;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr < 0 ||
        nc < 0 ||
        nr >= n ||
        nc >= n ||
        visited[nr][nc]
      ) continue;

      heap.push([Math.max(time, grid[nr][nc]), nr, nc]);
    }
  }

  return -1;
}
