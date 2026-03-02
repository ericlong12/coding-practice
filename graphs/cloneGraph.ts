/**
 * Clone Graph
 *
 * Pattern: DFS + HashMap
 * Time: O(V + E)
 * Space: O(V)
 *
 * Notes:
 * Use a map to track already cloned nodes
 * to avoid infinite recursion.
 */

export class GraphNode {
  constructor(
    public val: number,
    public neighbors: GraphNode[] = []
  ) {}
}

export function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (!node) return null;

  const cloneMap = new Map<GraphNode, GraphNode>();

  function dfs(current: GraphNode): GraphNode {
    if (cloneMap.has(current)) {
      return cloneMap.get(current)!;
    }

    const clonedNode = new GraphNode(current.val);
    cloneMap.set(current, clonedNode);

    for (const neighbor of current.neighbors) {
      clonedNode.neighbors.push(dfs(neighbor));
    }

    return clonedNode;
  }

  return dfs(node);
}
