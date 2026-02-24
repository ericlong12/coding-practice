/**
 * Searches for a target value inside a rotated sorted array.
 *
 * Strategy:
 * Modified binary search.
 * At least one half of the array is always sorted.
 *
 * Time: O(log n)
 * Space: O(1)
 */
export function searchInRotatedSortedArray(
  rotatingVoyage: number[],
  hiddenTreasure: number
): number {
  let leftScout = 0;
  let rightScout = rotatingVoyage.length - 1;

  while (leftScout <= rightScout) {
    const middleOracle = Math.floor((leftScout + rightScout) / 2);

    if (rotatingVoyage[middleOracle] === hiddenTreasure) {
      return middleOracle;
    }

    const leftIsSorted =
      rotatingVoyage[leftScout] <= rotatingVoyage[middleOracle];

    if (leftIsSorted) {
      const treasureInLeftRealm =
        hiddenTreasure >= rotatingVoyage[leftScout] &&
        hiddenTreasure < rotatingVoyage[middleOracle];

      if (treasureInLeftRealm) {
        rightScout = middleOracle - 1;
      } else {
        leftScout = middleOracle + 1;
      }
    } else {
      const treasureInRightRealm =
        hiddenTreasure > rotatingVoyage[middleOracle] &&
        hiddenTreasure <= rotatingVoyage[rightScout];

      if (treasureInRightRealm) {
        leftScout = middleOracle + 1;
      } else {
        rightScout = middleOracle - 1;
      }
    }
  }

  return -1;
}
