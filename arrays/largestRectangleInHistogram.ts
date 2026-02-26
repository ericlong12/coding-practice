/**
 * Finds the largest rectangle area in a histogram.
 *
 * Pattern:
 * Monotonic Increasing Stack
 *
 * Time: O(n)
 * Space: O(n)
 */
export function largestRectangleInHistogram(
  skylineBars: number[]
): number {
  const pillarStack: number[] = [];
  let maximumFortressArea = 0;

  for (let horizonIndex = 0; horizonIndex <= skylineBars.length; horizonIndex++) {
    const currentHeight =
      horizonIndex === skylineBars.length ? 0 : skylineBars[horizonIndex];

    while (
      pillarStack.length > 0 &&
      currentHeight < skylineBars[pillarStack[pillarStack.length - 1]]
    ) {
      const tallestPillarIndex = pillarStack.pop()!;
      const fortressHeight = skylineBars[tallestPillarIndex];

      const rightBoundary = horizonIndex;
      const leftBoundary =
        pillarStack.length === 0
          ? 0
          : pillarStack[pillarStack.length - 1] + 1;

      const fortressWidth = rightBoundary - leftBoundary;

      maximumFortressArea = Math.max(
        maximumFortressArea,
        fortressHeight * fortressWidth
      );
    }

    pillarStack.push(horizonIndex);
  }

  return maximumFortressArea;
}
