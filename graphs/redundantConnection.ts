/**
 * Redundant Connection
 *
 * Pattern: Union Find
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * First edge that forms a cycle is the answer.
 */

export function redundantConnection(edges: number[][]): number[] {
  const n = edges.length;
  const parent: number[] = new Array(n + 1);

  for (let i = 1; i <= n; i++) parent[i] = i;

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(a: number, b: number): boolean {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) return false;

    parent[rootA] = rootB;
    return true;
  }

  for (const [a, b] of edges) {
    if (!union(a, b)) {
      return [a, b];
    }
  }

  return [];
}
