/**
 * Counts the number of continuous subarrays that sum to k.
 *
 * Strategy:
 * Use prefix sum + hashmap.
 *
 * Time: O(n)
 * Space: O(n)
 */
export function subarraySumEqualsK(
  numberStream: number[],
  targetTreasure: number
): number {
  const prefixLedger = new Map<number, number>();
  prefixLedger.set(0, 1);

  let runningTotal = 0;
  let matchingSubarrays = 0;

  for (const number of numberStream) {
    runningTotal += number;

    const neededPrefix = runningTotal - targetTreasure;

    if (prefixLedger.has(neededPrefix)) {
      matchingSubarrays += prefixLedger.get(neededPrefix)!;
    }

    prefixLedger.set(
      runningTotal,
      (prefixLedger.get(runningTotal) ?? 0) + 1
    );
  }

  return matchingSubarrays;
}
