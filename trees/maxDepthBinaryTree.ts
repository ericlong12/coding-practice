/**
 * Max Depth of Binary Tree
 *
 * Pattern: DFS (Recursive)
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * Classic depth calculation using recursion.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function maxDepthBinaryTree(root: TreeNode | null): number {
  if (!root) return 0;

  const leftDepth = maxDepthBinaryTree(root.left);
  const rightDepth = maxDepthBinaryTree(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}
