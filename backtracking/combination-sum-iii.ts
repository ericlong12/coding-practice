/**
 * Combination Sum III
 *
 * Pattern: backtracking + pruning
 * Time: O(C(9,k))
 * Space: O(k)
 *
 * Notes:
 * Choose numbers 1..9 without repetition.
 * Prune when sum exceeds target.
 */

export function combinationSum3(k: number, n: number): number[][] {
  const result: number[][] = [];

  function backtrack(start: number, path: number[], sum: number): void {
    if (path.length === k) {
      if (sum === n) {
        result.push([...path]);
      }
      return;
    }

    for (let i = start; i <= 9; i++) {
      if (sum + i > n) break;

      path.push(i);
      backtrack(i + 1, path, sum + i);
      path.pop();
    }
  }

  backtrack(1, [], 0);
  return result;
}
