/**
 * Subsets
 *
 * Pattern: Backtracking
 * Time: O(n * 2^n)
 * Space: O(n)
 *
 * Notes:
 * At each index, decide whether to include the element.
 */

export function subsets(numbers: number[]): number[][] {
  const result: number[][] = [];
  const currentPath: number[] = [];

  function backtrack(startIndex: number): void {
    result.push([...currentPath]);

    for (let i = startIndex; i < numbers.length; i++) {
      currentPath.push(numbers[i]);
      backtrack(i + 1);
      currentPath.pop();
    }
  }

  backtrack(0);
  return result;
}
