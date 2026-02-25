/**
 * Calculates how much rainwater can be trapped between elevation bars.
 *
 * Strategy:
 * Two-pointer approach.
 * Always move the pointer with the smaller height inward.
 *
 * Time: O(n)
 * Space: O(1)
 */
export function trappingRainWater(
  skylineHeights: number[]
): number {
  let leftExplorer = 0;
  let rightExplorer = skylineHeights.length - 1;

  let leftWallHeight = 0;
  let rightWallHeight = 0;

  let collectedRainwater = 0;

  while (leftExplorer < rightExplorer) {
    if (skylineHeights[leftExplorer] < skylineHeights[rightExplorer]) {
      leftWallHeight = Math.max(leftWallHeight, skylineHeights[leftExplorer]);
      collectedRainwater += leftWallHeight - skylineHeights[leftExplorer];
      leftExplorer++;
    } else {
      rightWallHeight = Math.max(rightWallHeight, skylineHeights[rightExplorer]);
      collectedRainwater += rightWallHeight - skylineHeights[rightExplorer];
      rightExplorer--;
    }
  }

  return collectedRainwater;
}
