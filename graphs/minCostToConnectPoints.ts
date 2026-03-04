/**
 * Min Cost to Connect All Points
 *
 * Pattern: Minimum Spanning Tree (Kruskal)
 * Time: O(E log E)
 * Space: O(V)
 *
 * Notes:
 * Build all edges with Manhattan distance,
 * sort them, then union greedily.
 */

export function minCostToConnectPoints(points: number[][]): number {
  const n = points.length;
  const edges: [number, number, number][] = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const cost =
        Math.abs(points[i][0] - points[j][0]) +
        Math.abs(points[i][1] - points[j][1]);
      edges.push([cost, i, j]);
    }
  }

  edges.sort((a, b) => a[0] - b[0]);

  const parent: number[] = new Array(n);
  const rank: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) parent[i] = i;

  function find(node: number): number {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  }

  function union(a: number, b: number): boolean {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) return false;

    if (rank[rootA] < rank[rootB]) {
      parent[rootA] = rootB;
    } else if (rank[rootA] > rank[rootB]) {
      parent[rootB] = rootA;
    } else {
      parent[rootB] = rootA;
      rank[rootA]++;
    }

    return true;
  }

  let totalCost = 0;
  let edgesUsed = 0;

  for (const [cost, a, b] of edges) {
    if (union(a, b)) {
      totalCost += cost;
      edgesUsed++;
      if (edgesUsed === n - 1) break;
    }
  }

  return totalCost;
}
