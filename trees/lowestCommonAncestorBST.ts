/**
 * Lowest Common Ancestor of a BST
 *
 * Pattern: BST Property Traversal
 * Time: O(h)
 * Space: O(1)
 *
 * Notes:
 * Move left or right depending on values.
 * Split point is the LCA.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function lowestCommonAncestorBST(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode | null {
  let current = root;

  while (current) {
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
    } else if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } else {
      return current;
    }
  }

  return null;
}
