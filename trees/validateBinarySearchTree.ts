/**
 * Validate Binary Search Tree
 *
 * Pattern: DFS with Bounds
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * Pass down valid min/max bounds while traversing.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function validateBinarySearchTree(
  root: TreeNode | null
): boolean {
  function validate(
    node: TreeNode | null,
    min: number | null,
    max: number | null
  ): boolean {
    if (!node) return true;

    if ((min !== null && node.val <= min) ||
        (max !== null && node.val >= max)) {
      return false;
    }

    return (
      validate(node.left, min, node.val) &&
      validate(node.right, node.val, max)
    );
  }

  return validate(root, null, null);
}
