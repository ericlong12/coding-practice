/**
 * Longest Substring with At Most K Distinct Characters
 *
 * Pattern: Sliding Window
 * Time: O(n)
 * Space: O(k)
 *
 * Notes:
 * Maintain a frequency map and shrink the window when
 * distinct character count exceeds k.
 */

export function longestSubstringKDistinct(
  text: string,
  k: number
): number {
  const frequency = new Map<string, number>();
  let windowStart = 0;
  let bestLength = 0;

  for (let windowEnd = 0; windowEnd < text.length; windowEnd++) {
    const char = text[windowEnd];
    frequency.set(char, (frequency.get(char) ?? 0) + 1);

    while (frequency.size > k) {
      const startChar = text[windowStart];
      const updated = (frequency.get(startChar) ?? 0) - 1;

      if (updated === 0) frequency.delete(startChar);
      else frequency.set(startChar, updated);

      windowStart++;
    }

    bestLength = Math.max(bestLength, windowEnd - windowStart + 1);
  }

  return bestLength;
}
