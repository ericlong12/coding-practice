/**
 * Diameter of Binary Tree
 *
 * Pattern: DFS (Postorder Height Calculation)
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * Compute height bottom-up and track
 * the longest path seen at each node.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function diameterBinaryTree(root: TreeNode | null): number {
  let maxDiameter = 0;

  function height(node: TreeNode | null): number {
    if (!node) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  height(root);
  return maxDiameter;
}
