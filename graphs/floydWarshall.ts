/**
 * Floyd-Warshall Algorithm
 *
 * Pattern: Dynamic Programming (All-Pairs Shortest Path)
 * Time: O(n^3)
 * Space: O(n^2)
 *
 * Notes:
 * Update distances by considering each node as an intermediate.
 */

export function floydWarshall(matrix: number[][]): number[][] {
  const n = matrix.length;
  const dist = matrix.map(row => [...row]);

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
}
