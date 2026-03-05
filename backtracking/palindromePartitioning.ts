/**
 * Palindrome Partitioning
 *
 * Pattern: Backtracking + Pruning
 * Time: O(n * 2^n)
 * Space: O(n)
 *
 * Notes:
 * At each index, expand substrings and
 * only recurse if the substring is a palindrome.
 */

export function palindromePartitioning(text: string): string[][] {
  const result: string[][] = [];
  const currentPath: string[] = [];

  function isPalindrome(left: number, right: number): boolean {
    while (left < right) {
      if (text[left] !== text[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function backtrack(startIndex: number): void {
    if (startIndex === text.length) {
      result.push([...currentPath]);
      return;
    }

    for (let end = startIndex; end < text.length; end++) {
      if (!isPalindrome(startIndex, end)) continue;

      currentPath.push(text.slice(startIndex, end + 1));
      backtrack(end + 1);
      currentPath.pop();
    }
  }

  backtrack(0);
  return result;
}
