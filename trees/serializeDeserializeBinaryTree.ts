/**
 * Serialize and Deserialize Binary Tree
 *
 * Pattern: DFS (Preorder)
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * Use preorder traversal with null markers.
 */

export class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

export function serialize(root: TreeNode | null): string {
  const result: string[] = [];

  function dfs(node: TreeNode | null): void {
    if (!node) {
      result.push("null");
      return;
    }

    result.push(node.val.toString());
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result.join(",");
}

export function deserialize(data: string): TreeNode | null {
  const values = data.split(",");
  let index = 0;

  function dfs(): TreeNode | null {
    if (values[index] === "null") {
      index++;
      return null;
    }

    const node = new TreeNode(Number(values[index++]));
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}
