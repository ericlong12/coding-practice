/**
 * Binary Tree Cameras
 *
 * Pattern: tree dfs, greedy
 * Time: O(n)
 * Space: O(h)
 *
 * Notes:
 * Each node returns state:
 * 0 = needs camera
 * 1 = has camera
 * 2 = covered
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

export function minCameraCover(root: TreeNode | null): number {
  let cameras = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 2;

    const left = dfs(node.left);
    const right = dfs(node.right);

    if (left === 0 || right === 0) {
      cameras++;
      return 1;
    }

    if (left === 1 || right === 1) {
      return 2;
    }

    return 0;
  }

  return dfs(root) === 0 ? cameras + 1 : cameras;
}
