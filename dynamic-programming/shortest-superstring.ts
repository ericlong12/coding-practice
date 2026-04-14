/**
 * Find the Shortest Superstring
 *
 * Pattern: bitmask dp + string overlap
 * Time: O(n^2 * 2^n)
 * Space: O(n * 2^n)
 *
 * Notes:
 * Precompute overlaps and use TSP-style DP to maximize overlap.
 */

export function shortestSuperstring(words: string[]): string {
  const n = words.length;

  const overlap = Array.from({ length: n }, () =>
    new Array<number>(n).fill(0),
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;

      const w1 = words[i];
      const w2 = words[j];

      for (let k = Math.min(w1.length, w2.length); k >= 0; k--) {
        if (w1.endsWith(w2.slice(0, k))) {
          overlap[i][j] = k;
          break;
        }
      }
    }
  }

  const dp: number[][] = Array.from({ length: 1 << n }, () =>
    new Array<number>(n).fill(0),
  );

  const parent: number[][] = Array.from({ length: 1 << n }, () =>
    new Array<number>(n).fill(-1),
  );

  for (let mask = 0; mask < (1 << n); mask++) {
    for (let last = 0; last < n; last++) {
      if ((mask & (1 << last)) === 0) continue;

      const prevMask = mask ^ (1 << last);

      if (prevMask === 0) continue;

      for (let prev = 0; prev < n; prev++) {
        if ((prevMask & (1 << prev)) === 0) continue;

        const val = dp[prevMask][prev] + overlap[prev][last];

        if (val > dp[mask][last]) {
          dp[mask][last] = val;
          parent[mask][last] = prev;
        }
      }
    }
  }

  let mask = (1 << n) - 1;
  let last = 0;

  for (let i = 1; i < n; i++) {
    if (dp[mask][i] > dp[mask][last]) {
      last = i;
    }
  }

  const order: number[] = [];

  while (last !== -1) {
    order.push(last);
    const temp = parent[mask][last];
    mask ^= (1 << last);
    last = temp;
  }

  order.reverse();

  let result = words[order[0]];

  for (let i = 1; i < order.length; i++) {
    const prev = order[i - 1];
    const curr = order[i];
    const overlapLen = overlap[prev][curr];

    result += words[curr].slice(overlapLen);
  }

  return result;
}
