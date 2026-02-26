/**
 * Find the Duplicate Number
 *
 * Pattern: Floyd's Tortoise and Hare (Cycle Detection)
 * Time: O(n)
 * Space: O(1)
 */

export function findDuplicateNumber(values: number[]): number {
  let slow = values[0];
  let fast = values[0];

  do {
    slow = values[slow];
    fast = values[values[fast]];
  } while (slow !== fast);

  slow = values[0];

  while (slow !== fast) {
    slow = values[slow];
    fast = values[fast];
  }

  return slow;
}
