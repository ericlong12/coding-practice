/**
 * Network Delay Time
 *
 * Pattern: Dijkstra (Min Heap)
 * Time: O(E log V)
 * Space: O(V + E)
 *
 * Notes:
 * Standard single-source shortest path.
 * Use a min heap to always expand the closest node next.
 */

export function networkDelayTime(
  times: number[][],
  n: number,
  k: number
): number {
  const adjacency: Map<number, [number, number][]> = new Map();

  for (let i = 1; i <= n; i++) {
    adjacency.set(i, []);
  }

  for (const [source, target, weight] of times) {
    adjacency.get(source)!.push([target, weight]);
  }

  const minHeap: [number, number][] = [[0, k]];
  const distances: Map<number, number> = new Map();

  while (minHeap.length > 0) {
    minHeap.sort((a, b) => a[0] - b[0]);
    const [currentTime, node] = minHeap.shift()!;

    if (distances.has(node)) continue;
    distances.set(node, currentTime);

    for (const [neighbor, weight] of adjacency.get(node)!) {
      if (!distances.has(neighbor)) {
        minHeap.push([currentTime + weight, neighbor]);
      }
    }
  }

  if (distances.size !== n) return -1;

  return Math.max(...distances.values());
}
