/**
 * LRU Cache
 *
 * Pattern: Hash Map + Doubly Linked List
 * Time: O(1) per operation
 * Space: O(capacity)
 *
 * Notes:
 * Use a doubly linked list to track usage order.
 * Most recently used at head, least at tail.
 */

class ListNode {
  constructor(
    public key: number,
    public value: number,
    public prev: ListNode | null = null,
    public next: ListNode | null = null
  ) {}
}

export class LRUCache {
  private capacity: number;
  private cache: Map<number, ListNode>;
  private head: ListNode;
  private tail: ListNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();

    this.head = new ListNode(0, 0);
    this.tail = new ListNode(0, 0);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;

    const node = this.cache.get(key)!;
    this.remove(node);
    this.insert(node);

    return node.value;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key)!);
    }

    const node = new ListNode(key, value);
    this.insert(node);
    this.cache.set(key, node);

    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev!;
      this.remove(lru);
      this.cache.delete(lru.key);
    }
  }

  private remove(node: ListNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insert(node: ListNode): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }
}
