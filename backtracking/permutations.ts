/**
 * Permutations
 *
 * Pattern: Backtracking
 * Time: O(n! * n)
 * Space: O(n)
 *
 * Notes:
 * Use a visited array to avoid reusing elements
 * in the current permutation path.
 */

export function permutations(numbers: number[]): number[][] {
  const result: number[][] = [];
  const currentPath: number[] = [];
  const used: boolean[] = new Array(numbers.length).fill(false);

  function backtrack(): void {
    if (currentPath.length === numbers.length) {
      result.push([...currentPath]);
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      currentPath.push(numbers[i]);

      backtrack();

      currentPath.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}
