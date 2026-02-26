/**
 * Finds the minimal length of a contiguous subarray
 * whose sum is greater than or equal to target.
 *
 * Pattern:
 * Sliding Window
 *
 * Time: O(n)
 * Space: O(1)
 */
export function minimumSizeSubarraySum(
  targetTreasure: number,
  numberStream: number[]
): number {
  let leftGate = 0;
  let runningTotal = 0;
  let smallestWindow = Infinity;

  for (let rightGate = 0; rightGate < numberStream.length; rightGate++) {
    runningTotal += numberStream[rightGate];

    while (runningTotal >= targetTreasure) {
      smallestWindow = Math.min(
        smallestWindow,
        rightGate - leftGate + 1
      );

      runningTotal -= numberStream[leftGate];
      leftGate++;
    }
  }

  return smallestWindow === Infinity ? 0 : smallestWindow;
}
