/**
 * Sliding Window with Frequency Map
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function minWindow(s: string, t: string): string {
  if (t.length === 0) return "";

  const need = new Map<string, number>();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let have = 0;
  let left = 0;
  let minLen = Infinity;
  let result = "";

  const window = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    window.set(char, (window.get(char) || 0) + 1);

    if (need.has(char) && window.get(char) === need.get(char)) {
      have++;
    }

    while (have === need.size) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        result = s.slice(left, right + 1);
      }

      const leftChar = s[left];
      window.set(leftChar, window.get(leftChar)! - 1);

      if (need.has(leftChar) && window.get(leftChar)! < need.get(leftChar)!) {
        have--;
      }

      left++;
    }
  }

  return result;
}
