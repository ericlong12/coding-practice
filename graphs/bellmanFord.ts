/**
 * Bellman-Ford Algorithm
 *
 * Pattern: Graph (Relaxation)
 * Time: O(V * E)
 * Space: O(V)
 *
 * Notes:
 * Handles negative weights and detects negative cycles.
 */

export function bellmanFord(
  n: number,
  edges: number[][],
  source: number
): number[] {
  const distances: number[] = new Array(n).fill(Infinity);
  distances[source] = 0;

  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
        distances[v] = distances[u] + w;
      }
    }
  }

  for (const [u, v, w] of edges) {
    if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
      throw new Error("Negative weight cycle detected");
    }
  }

  return distances;
}
