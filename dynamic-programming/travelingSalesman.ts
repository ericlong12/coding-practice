/**
 * Traveling Salesman Problem (TSP)
 *
 * Pattern: Bitmask DP
 * Time: O(n^2 * 2^n)
 * Space: O(n * 2^n)
 *
 * Notes:
 * dp[mask][i] = minimum cost to reach node i with visited mask
 */

export function travelingSalesman(graph: number[][]): number {
  const n = graph.length;
  const FULL_MASK = 1 << n;

  const dp: number[][] = Array.from({ length: FULL_MASK }, () =>
    new Array(n).fill(Infinity)
  );

  dp[1][0] = 0;

  for (let mask = 1; mask < FULL_MASK; mask++) {
    for (let u = 0; u < n; u++) {
      if (!(mask & (1 << u))) continue;

      for (let v = 0; v < n; v++) {
        if (mask & (1 << v)) continue;

        const nextMask = mask | (1 << v);
        dp[nextMask][v] = Math.min(
          dp[nextMask][v],
          dp[mask][u] + graph[u][v]
        );
      }
    }
  }

  let result = Infinity;

  for (let i = 1; i < n; i++) {
    result = Math.min(
      result,
      dp[FULL_MASK - 1][i] + graph[i][0]
    );
  }

  return result;
}
