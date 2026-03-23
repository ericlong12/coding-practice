/**
 * Union Find (Disjoint Set Union)
 *
 * Pattern: DSU with Path Compression + Rank
 * Time: O(alpha(n))
 * Space: O(n)
 *
 * Notes:
 * Core reusable structure for connectivity problems.
 */

export class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(size: number) {
    this.parent = new Array(size);
    this.rank = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
    }
  }

  find(node: number): number {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]);
    }
    return this.parent[node];
  }

  union(a: number, b: number): boolean {
    const rootA = this.find(a);
    const rootB = this.find(b);

    if (rootA === rootB) return false;

    if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }

    return true;
  }
}
