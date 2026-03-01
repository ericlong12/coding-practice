/**
 * Longest Repeating Character Replacement
 *
 * Pattern: Sliding Window (Maintain Max Frequency)
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * The key insight is tracking the count of the most frequent
 * character inside the window. If window size - maxFrequency
 * exceeds k, the window is invalid and we shrink.
 */

export function longestRepeatingCharacterReplacement(
  text: string,
  k: number
): number {
  const frequency: number[] = new Array(26).fill(0);

  let windowStart = 0;
  let maxFrequency = 0;
  let bestLength = 0;

  for (let windowEnd = 0; windowEnd < text.length; windowEnd++) {
    const index = text.charCodeAt(windowEnd) - 65;
    frequency[index]++;

    maxFrequency = Math.max(maxFrequency, frequency[index]);

    while (windowEnd - windowStart + 1 - maxFrequency > k) {
      const startIndex = text.charCodeAt(windowStart) - 65;
      frequency[startIndex]--;
      windowStart++;
    }

    bestLength = Math.max(bestLength, windowEnd - windowStart + 1);
  }

  return bestLength;
}
