/**
 * Word Break II
 *
 * Pattern: dp + backtracking with memo
 * Time: Exponential worst case, pruned with memo
 * Space: O(n * result size)
 *
 * Notes:
 * Build sentences using DFS, memoizing start index to avoid recomputation.
 */

export function wordBreak(s: string, wordDict: string[]): string[] {
  const wordSet = new Set(wordDict);
  const memo = new Map<number, string[]>();

  function dfs(start: number): string[] {
    if (memo.has(start)) return memo.get(start)!;

    const result: string[] = [];

    if (start === s.length) {
      result.push("");
      return result;
    }

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);

      if (!wordSet.has(word)) continue;

      const subResults = dfs(end);

      for (const sub of subResults) {
        result.push(sub ? word + " " + sub : word);
      }
    }

    memo.set(start, result);
    return result;
  }

  return dfs(0);
}
