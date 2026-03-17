/**
 * Longest Repeating Character Replacement
 *
 * Pattern: Sliding Window
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Track the count of the most frequent character
 * inside the window to determine validity.
 */

export function longestRepeatingCharacterReplacement(
  s: string,
  k: number
): number {
  const freq: number[] = new Array(26).fill(0);

  let left = 0;
  let maxFreq = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const idx = s.charCodeAt(right) - 65;
    freq[idx]++;

    maxFreq = Math.max(maxFreq, freq[idx]);

    while (right - left + 1 - maxFreq > k) {
      freq[s.charCodeAt(left) - 65]--;
      left++;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
