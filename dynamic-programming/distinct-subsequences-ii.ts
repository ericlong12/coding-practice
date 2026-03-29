/**
 * Distinct Subsequences II
 *
 * Pattern: dp with last occurrence tracking
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Track contribution of each character and subtract duplicates using last seen.
 */

export function distinctSubseqII(s: string): number {
  const mod = 1_000_000_007;
  let total = 1;

  const last = new Map<string, number>();

  for (const char of s) {
    const newTotal = (total * 2) % mod;

    if (last.has(char)) {
      total = (newTotal - last.get(char)! + mod) % mod;
    } else {
      total = newTotal;
    }

    last.set(char, total / 2);
  }

  return (total - 1 + mod) % mod;
}
