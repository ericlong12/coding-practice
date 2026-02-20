/**
 * Expand Around Center
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
export function longestPalindrome(s: string): string {
  if (s.length < 2) return s;

  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    const len1 = expand(s, i, i);
    const len2 = expand(s, i, i + 1);
    const len = Math.max(len1, len2);

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
}

function expand(s: string, left: number, right: number): number {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}
