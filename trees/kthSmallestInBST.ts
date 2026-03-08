/**
 * Kth Smallest Element in BST
 *
 * Pattern: Inorder Traversal
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * Inorder traversal of BST yields sorted order.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function kthSmallestInBST(
  root: TreeNode | null,
  k: number
): number {
  let count = 0;
  let result = 0;

  function inorder(node: TreeNode | null): void {
    if (!node) return;

    inorder(node.left);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  }

  inorder(root);
  return result;
}
