/**
 * Alien Dictionary
 *
 * Pattern: topological sort (kahn's algorithm)
 * Time: O(V + E)
 * Space: O(V + E)
 *
 * Notes:
 * Build ordering constraints from adjacent words, then topo sort.
 */

export function alienOrder(words: string[]): string {
  const graph = new Map<string, Set<string>>();
  const indegree = new Map<string, number>();

  for (const word of words) {
    for (const char of word) {
      if (!graph.has(char)) graph.set(char, new Set());
      if (!indegree.has(char)) indegree.set(char, 0);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];

    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }

    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!graph.get(w1[j])!.has(w2[j])) {
          graph.get(w1[j])!.add(w2[j]);
          indegree.set(w2[j], indegree.get(w2[j])! + 1);
        }
        break;
      }
    }
  }

  const queue: string[] = [];

  for (const [char, deg] of indegree) {
    if (deg === 0) queue.push(char);
  }

  let result = "";

  while (queue.length > 0) {
    const char = queue.shift()!;
    result += char;

    for (const neighbor of graph.get(char)!) {
      indegree.set(neighbor, indegree.get(neighbor)! - 1);
      if (indegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result.length === indegree.size ? result : "";
}
