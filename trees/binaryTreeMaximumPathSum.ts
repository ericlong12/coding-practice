/**
 * Binary Tree Maximum Path Sum
 *
 * Pattern: DFS with Global Tracking
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * At each node, compute max gain from left/right.
 * Only include positive contributions.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function binaryTreeMaximumPathSum(
  root: TreeNode | null
): number {
  let maxSum = -Infinity;

  function maxGain(node: TreeNode | null): number {
    if (!node) return 0;

    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);

    const currentPathSum = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, currentPathSum);

    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}
