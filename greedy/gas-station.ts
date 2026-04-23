/**
 * Gas Station (Greedy)
 *
 * Pattern: greedy + prefix sum insight
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * If total gas < total cost → impossible.
 * Otherwise, reset start whenever running sum drops below zero.
 */

export function canCompleteCircuit(gas: number[], cost: number[]): number {
  let total = 0;
  let current = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    current += diff;

    if (current < 0) {
      current = 0;
      start = i + 1;
    }
  }

  return total >= 0 ? start : -1;
}
