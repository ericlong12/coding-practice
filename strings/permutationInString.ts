/**
 * Permutation in String
 *
 * Pattern: Sliding Window + Frequency Count
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Maintain a fixed-size window matching the length
 * of the target string and compare frequency counts.
 */

export function permutationInString(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const target: number[] = new Array(26).fill(0);
  const window: number[] = new Array(26).fill(0);

  for (const char of s1) {
    target[char.charCodeAt(0) - 97]++;
  }

  let left = 0;

  for (let right = 0; right < s2.length; right++) {
    window[s2.charCodeAt(right) - 97]++;

    if (right - left + 1 > s1.length) {
      window[s2.charCodeAt(left) - 97]--;
      left++;
    }

    if (arraysMatch(target, window)) return true;
  }

  return false;
}

function arraysMatch(a: number[], b: number[]): boolean {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
