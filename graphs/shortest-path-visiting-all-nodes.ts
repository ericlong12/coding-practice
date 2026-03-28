/**
 * Shortest Path Visiting All Nodes
 *
 * Pattern: bfs + bitmask state
 * Time: O(n * 2^n)
 * Space: O(n * 2^n)
 *
 * Notes:
 * State = (node, visitedMask). Multi-source BFS from all nodes.
 */

export function shortestPathLength(graph: number[][]): number {
  const n = graph.length;
  const targetMask = (1 << n) - 1;

  const queue: [number, number][] = [];
  const visited = new Set<string>();

  for (let i = 0; i < n; i++) {
    const mask = 1 << i;
    queue.push([i, mask]);
    visited.add(`${i}-${mask}`);
  }

  let steps = 0;

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [node, mask] = queue.shift()!;

      if (mask === targetMask) return steps;

      for (const neighbor of graph[node]) {
        const nextMask = mask | (1 << neighbor);
        const key = `${neighbor}-${nextMask}`;

        if (!visited.has(key)) {
          visited.add(key);
          queue.push([neighbor, nextMask]);
        }
      }
    }

    steps++;
  }

  return -1;
}
