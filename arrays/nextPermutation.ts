/**
 * Next Permutation
 *
 * Pattern: In-place Array Manipulation
 * Time: O(n)
 * Space: O(1)
 */

export function nextPermutation(sequence: number[]): number[] {
  let pivot = sequence.length - 2;

  while (pivot >= 0 && sequence[pivot] >= sequence[pivot + 1]) {
    pivot--;
  }

  if (pivot >= 0) {
    let successor = sequence.length - 1;

    while (sequence[successor] <= sequence[pivot]) {
      successor--;
    }

    [sequence[pivot], sequence[successor]] = [
      sequence[successor],
      sequence[pivot],
    ];
  }

  reverse(sequence, pivot + 1);

  return sequence;
}

function reverse(sequence: number[], start: number): void {
  let left = start;
  let right = sequence.length - 1;

  while (left < right) {
    [sequence[left], sequence[right]] = [
      sequence[right],
      sequence[left],
    ];
    left++;
    right--;
  }
}
