/**
 * Balanced Binary Tree
 *
 * Pattern: DFS (Height + Early Termination)
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * Return -1 if subtree is unbalanced to short-circuit recursion.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function balancedBinaryTree(root: TreeNode | null): boolean {
  function height(node: TreeNode | null): number {
    if (!node) return 0;

    const leftHeight = height(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = height(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return height(root) !== -1;
}
