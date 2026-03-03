/**
 * Number of Connected Components in an Undirected Graph
 *
 * Pattern: Union-Find (Disjoint Set)
 * Time: O(V + E)
 * Space: O(V)
 *
 * Notes:
 * Use path compression and union by rank.
 */

export function numberOfConnectedComponents(
  n: number,
  edges: number[][]
): number {
  const parent: number[] = new Array(n);
  const rank: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) parent[i] = i;

  function find(node: number): number {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  }

  function union(node1: number, node2: number): void {
    const root1 = find(node1);
    const root2 = find(node2);

    if (root1 === root2) return;

    if (rank[root1] < rank[root2]) {
      parent[root1] = root2;
    } else if (rank[root1] > rank[root2]) {
      parent[root2] = root1;
    } else {
      parent[root2] = root1;
      rank[root1]++;
    }
  }

  for (const [a, b] of edges) {
    union(a, b);
  }

  const uniqueRoots = new Set<number>();
  for (let i = 0; i < n; i++) {
    uniqueRoots.add(find(i));
  }

  return uniqueRoots.size;
}
