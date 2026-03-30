/**
 * Path Sum III
 *
 * Pattern: tree dfs, prefix sum
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * Prefix sums let us count how many earlier paths would make the current
 * running sum land on the target. This avoids restarting a search from
 * every node.
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

export function pathSum(root: TreeNode | null, targetSum: number): number {
  const prefixCounts = new Map<number, number>();
  prefixCounts.set(0, 1);

  const depthFirstSearch = (node: TreeNode | null, runningSum: number): number => {
    if (node === null) {
      return 0;
    }

    const nextSum = runningSum + node.val;
    let totalPaths = prefixCounts.get(nextSum - targetSum) ?? 0;

    prefixCounts.set(nextSum, (prefixCounts.get(nextSum) ?? 0) + 1);

    totalPaths += depthFirstSearch(node.left, nextSum);
    totalPaths += depthFirstSearch(node.right, nextSum);

    prefixCounts.set(nextSum, prefixCounts.get(nextSum)! - 1);

    return totalPaths;
  };

  return depthFirstSearch(root, 0);
}
