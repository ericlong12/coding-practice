/**
 * Invert Binary Tree
 *
 * Pattern: DFS (Swap Children)
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * Swap left and right pointers recursively.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function invertBinaryTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  const leftInverted = invertBinaryTree(root.left);
  const rightInverted = invertBinaryTree(root.right);

  root.left = rightInverted;
  root.right = leftInverted;

  return root;
}
