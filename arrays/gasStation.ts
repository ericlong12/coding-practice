/**
 * Gas Station
 *
 * Pattern: Greedy
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * If total gas < total cost, it's impossible.
 * Otherwise, whenever the tank drops below zero,
 * I reset the starting point — because anything before
 * that point cannot be a valid start.
 */

export function gasStation(gas: number[], cost: number[]): number {
  let totalBalance = 0;
  let currentTank = 0;
  let candidateStart = 0;

  for (let i = 0; i < gas.length; i++) {
    const net = gas[i] - cost[i];

    totalBalance += net;
    currentTank += net;

    if (currentTank < 0) {
      candidateStart = i + 1;
      currentTank = 0;
    }
  }

  return totalBalance >= 0 ? candidateStart : -1;
}
