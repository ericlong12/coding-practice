/**
 * Minimum Number of Arrows to Burst Balloons
 *
 * Pattern: Greedy (Sort by End)
 * Time: O(n log n)
 * Space: O(1)
 *
 * Notes:
 * Shoot arrow at the end of first balloon.
 * Only shoot again when next balloon starts after arrow.
 */

export function minArrowsToBurstBalloons(points: number[][]): number {
  if (points.length === 0) return 0;

  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let arrowPosition = points[0][1];

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > arrowPosition) {
      arrows++;
      arrowPosition = points[i][1];
    }
  }

  return arrows;
}
