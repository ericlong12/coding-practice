/**
 * Russian Doll Envelopes
 *
 * Pattern: dp + sorting + LIS
 * Time: O(n log n)
 * Space: O(n)
 *
 * Notes:
 * Sort width ascending, height descending.
 * Then find LIS on heights.
 */

export function maxEnvelopes(envelopes: number[][]): number {
  envelopes.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    return a[0] - b[0];
  });

  const lis: number[] = [];

  for (const [, height] of envelopes) {
    let left = 0;
    let right = lis.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (lis[mid] < height) left = mid + 1;
      else right = mid;
    }

    lis[left] = height;
  }

  return lis.length;
}
