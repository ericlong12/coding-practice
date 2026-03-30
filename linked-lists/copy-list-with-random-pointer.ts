/**
 * Copy List with Random Pointer
 *
 * Pattern: linked list, hashmap
 * Time: O(n)
 * Space: O(n)
 *
 * Notes:
 * Map each original node to its clone, then wire next and random pointers
 * in a second pass. It is straightforward and keeps pointer logic readable.
 */

export class RandomListNode {
  val: number;
  next: RandomListNode | null;
  random: RandomListNode | null;

  constructor(
    val?: number,
    next?: RandomListNode | null,
    random?: RandomListNode | null,
  ) {
    this.val = val ?? 0;
    this.next = next ?? null;
    this.random = random ?? null;
  }
}

export function copyRandomList(
  head: RandomListNode | null,
): RandomListNode | null {
  if (head === null) {
    return null;
  }

  const nodeMap = new Map<RandomListNode, RandomListNode>();

  let current: RandomListNode | null = head;
  while (current !== null) {
    nodeMap.set(current, new RandomListNode(current.val));
    current = current.next;
  }

  current = head;
  while (current !== null) {
    const clonedNode = nodeMap.get(current)!;
    clonedNode.next = current.next ? nodeMap.get(current.next)! : null;
    clonedNode.random = current.random ? nodeMap.get(current.random)! : null;
    current = current.next;
  }

  return nodeMap.get(head)!;
}
