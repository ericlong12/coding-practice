/**
 * Number of Islands II
 *
 * Pattern: union find, dynamic connectivity
 * Time: O(k * α(n))
 * Space: O(n)
 *
 * Notes:
 * We add land incrementally and union with neighbors.
 * Track island count as components merge.
 */

class UnionFind {
  private parent: number[];
  private rank: number[];
  private count: number;

  constructor(size: number) {
    this.parent = new Array(size).fill(-1);
    this.rank = new Array(size).fill(0);
    this.count = 0;
  }

  add(x: number): void {
    if (this.parent[x] !== -1) return;
    this.parent[x] = x;
    this.count++;
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.count--;
  }

  getCount(): number {
    return this.count;
  }
}

export function numIslands2(
  m: number,
  n: number,
  positions: number[][],
): number[] {
  const uf = new UnionFind(m * n);
  const result: number[] = [];

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const grid = Array.from({ length: m }, () =>
    new Array<boolean>(n).fill(false),
  );

  for (const [r, c] of positions) {
    if (grid[r][c]) {
      result.push(uf.getCount());
      continue;
    }

    grid[r][c] = true;
    const index = r * n + c;
    uf.add(index);

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr < 0 ||
        nc < 0 ||
        nr >= m ||
        nc >= n ||
        !grid[nr][nc]
      ) continue;

      uf.union(index, nr * n + nc);
    }

    result.push(uf.getCount());
  }

  return result;
}
