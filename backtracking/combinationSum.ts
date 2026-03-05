/**
 * Combination Sum
 *
 * Pattern: Backtracking
 * Time: O(2^n) worst case
 * Space: O(n)
 *
 * Notes:
 * Allow reuse of elements by staying on the same index
 * when exploring deeper.
 */

export function combinationSum(
  candidates: number[],
  target: number
): number[][] {
  const result: number[][] = [];
  const currentPath: number[] = [];

  function backtrack(startIndex: number, remaining: number): void {
    if (remaining === 0) {
      result.push([...currentPath]);
      return;
    }

    if (remaining < 0) return;

    for (let i = startIndex; i < candidates.length; i++) {
      currentPath.push(candidates[i]);
      backtrack(i, remaining - candidates[i]);
      currentPath.pop();
    }
  }

  backtrack(0, target);
  return result;
}
