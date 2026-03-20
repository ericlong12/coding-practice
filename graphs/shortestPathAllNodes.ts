/**
 * Shortest Path Visiting All Nodes
 *
 * Pattern: BFS + Bitmask
 * Time: O(n * 2^n)
 * Space: O(n * 2^n)
 *
 * Notes:
 * Each state = (node, visitedMask)
 * Use BFS to find shortest path covering all nodes.
 */

export function shortestPathAllNodes(graph: number[][]): number {
  const n = graph.length;
  const targetMask = (1 << n) - 1;

  const queue: [number, number, number][] = [];
  const visited = new Set<string>();

  for (let i = 0; i < n; i++) {
    const mask = 1 << i;
    queue.push([i, mask, 0]);
    visited.add(`${i}-${mask}`);
  }

  while (queue.length > 0) {
    const [node, mask, dist] = queue.shift()!;

    if (mask === targetMask) return dist;

    for (const neighbor of graph[node]) {
      const nextMask = mask | (1 << neighbor);
      const key = `${neighbor}-${nextMask}`;

      if (!visited.has(key)) {
        visited.add(key);
        queue.push([neighbor, nextMask, dist + 1]);
      }
    }
  }

  return -1;
}
