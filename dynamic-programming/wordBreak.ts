/**
 * Word Break
 *
 * Pattern: 1D Dynamic Programming
 * Time: O(n^2)
 * Space: O(n)
 *
 * Notes:
 * dp[i] indicates whether substring s[0..i-1]
 * can be segmented using dictionary words.
 */

export function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const dp: boolean[] = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}
