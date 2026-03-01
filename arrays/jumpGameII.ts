/**
 * Jump Game II
 *
 * Pattern: Greedy (Range Expansion)
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Track the current jump boundary and expand the farthest
 * reachable index within that boundary. When reaching the
 * boundary, increment jumps and extend the range.
 */

export function jumpGameII(steps: number[]): number {
  let jumps = 0;
  let currentBoundary = 0;
  let farthestReach = 0;

  for (let i = 0; i < steps.length - 1; i++) {
    farthestReach = Math.max(farthestReach, i + steps[i]);

    if (i === currentBoundary) {
      jumps++;
      currentBoundary = farthestReach;
    }
  }

  return jumps;
}
