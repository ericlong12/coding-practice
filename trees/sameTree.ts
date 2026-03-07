/**
 * Same Tree
 *
 * Pattern: DFS Comparison
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * Recursively compare structure and values.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function sameTree(
  treeA: TreeNode | null,
  treeB: TreeNode | null
): boolean {
  if (!treeA && !treeB) return true;
  if (!treeA || !treeB) return false;
  if (treeA.val !== treeB.val) return false;

  return (
    sameTree(treeA.left, treeB.left) &&
    sameTree(treeA.right, treeB.right)
  );
}
