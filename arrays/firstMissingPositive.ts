/**
 * First Missing Positive
 *
 * Pattern: Index Placement (Cyclic Sort Idea)
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * I’m using the array itself as a hash by placing each value
 * in its "correct" index position when possible.
 * The first index that doesn’t match reveals the answer.
 */

export function firstMissingPositive(values: number[]): number {
  const length = values.length;

  for (let i = 0; i < length; i++) {
    while (
      values[i] > 0 &&
      values[i] <= length &&
      values[values[i] - 1] !== values[i]
    ) {
      const correctIndex = values[i] - 1;
      [values[i], values[correctIndex]] = [
        values[correctIndex],
        values[i],
      ];
    }
  }

  for (let i = 0; i < length; i++) {
    if (values[i] !== i + 1) {
      return i + 1;
    }
  }

  return length + 1;
}
