/**
 * Finds the length of the longest consecutive sequence.
 *
 * Strategy:
 * Use a Set to achieve O(n) time.
 * Only start counting when we find the beginning of a sequence.
 *
 * Time: O(n)
 * Space: O(n)
 */
export function longestConsecutiveSequence(
  numberGalaxy: number[]
): number {
  const cosmicSet = new Set(numberGalaxy);
  let longestStreak = 0;

  for (const star of cosmicSet) {
    const isSequenceBeginning = !cosmicSet.has(star - 1);

    if (isSequenceBeginning) {
      let currentStar = star;
      let currentStreak = 1;

      while (cosmicSet.has(currentStar + 1)) {
        currentStar++;
        currentStreak++;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
}
