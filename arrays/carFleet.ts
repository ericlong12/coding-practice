/**
 * Car Fleet
 *
 * Pattern: Monotonic Stack + Sorting
 * Time: O(n log n)
 * Space: O(n)
 *
 * Notes:
 * Sort cars by position descending.
 * Track time to reach target; fleets form
 * when slower cars block faster ones.
 */

export function carFleet(
  target: number,
  position: number[],
  speed: number[]
): number {
  const cars = position
    .map((pos, i) => [pos, speed[i]])
    .sort((a, b) => b[0] - a[0]);

  let fleets = 0;
  let slowestTime = 0;

  for (const [pos, spd] of cars) {
    const time = (target - pos) / spd;

    if (time > slowestTime) {
      fleets++;
      slowestTime = time;
    }
  }

  return fleets;
}
