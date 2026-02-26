/**
 * Move Zeroes
 *
 * Pattern: Two Pointers
 * Time: O(n)
 * Space: O(1)
 */

export function moveZeroes(numberTrail: number[]): number[] {
  let insertPosition = 0;

  for (let explorer = 0; explorer < numberTrail.length; explorer++) {
    if (numberTrail[explorer] !== 0) {
      [numberTrail[insertPosition], numberTrail[explorer]] = [
        numberTrail[explorer],
        numberTrail[insertPosition],
      ];
      insertPosition++;
    }
  }

  return numberTrail;
}
