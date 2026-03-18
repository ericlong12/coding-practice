/**
 * LFU Cache
 *
 * Pattern: Hash Map + Frequency Map
 * Time: O(1) average
 * Space: O(capacity)
 *
 * Notes:
 * Track frequency counts and evict least frequently used.
 */

class Node {
  constructor(
    public key: number,
    public value: number,
    public freq: number = 1
  ) {}
}

export class LFUCache {
  private capacity: number;
  private minFreq: number;
  private keyMap: Map<number, Node>;
  private freqMap: Map<number, Map<number, Node>>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.minFreq = 0;
    this.keyMap = new Map();
    this.freqMap = new Map();
  }

  get(key: number): number {
    if (!this.keyMap.has(key)) return -1;

    const node = this.keyMap.get(key)!;
    this.update(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (this.capacity === 0) return;

    if (this.keyMap.has(key)) {
      const node = this.keyMap.get(key)!;
      node.value = value;
      this.update(node);
      return;
    }

    if (this.keyMap.size >= this.capacity) {
      const leastFreqNodes = this.freqMap.get(this.minFreq)!;
      const evictKey = leastFreqNodes.keys().next().value;
      leastFreqNodes.delete(evictKey);
      this.keyMap.delete(evictKey);
    }

    const newNode = new Node(key, value);
    this.keyMap.set(key, newNode);

    if (!this.freqMap.has(1)) {
      this.freqMap.set(1, new Map());
    }

    this.freqMap.get(1)!.set(key, newNode);
    this.minFreq = 1;
  }

  private update(node: Node): void {
    const freq = node.freq;
    const freqGroup = this.freqMap.get(freq)!;

    freqGroup.delete(node.key);

    if (freq === this.minFreq && freqGroup.size === 0) {
      this.minFreq++;
    }

    node.freq++;

    if (!this.freqMap.has(node.freq)) {
      this.freqMap.set(node.freq, new Map());
    }

    this.freqMap.get(node.freq)!.set(node.key, node);
  }
}
