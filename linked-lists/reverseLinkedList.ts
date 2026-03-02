/**
 * Reverse Linked List
 *
 * Pattern: Iterative Pointer Reversal
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Classic pointer reversal. Move through the list once,
 * flipping the direction of next pointers as we go.
 */

export class ListNode {
  constructor(
    public val: number,
    public next: ListNode | null = null
  ) {}
}

export function reverseLinkedList(head: ListNode | null): ListNode | null {
  let previous: ListNode | null = null;
  let current: ListNode | null = head;

  while (current) {
    const nextNode = current.next;
    current.next = previous;
    previous = current;
    current = nextNode;
  }

  return previous;
}
