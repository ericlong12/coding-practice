/**
 * Reorganize String
 *
 * Pattern: greedy + max heap
 * Time: O(n log k)
 * Space: O(k)
 *
 * Notes:
 * Always pick top two frequent chars to avoid adjacency.
 */

class MaxHeap {
  private data: [string, number][] = [];

  push(val: [string, number]): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): [string, number] {
    const top = this.data[0];
    const last = this.data.pop()!;

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  get size(): number {
    return this.data.length;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p][1] >= this.data[i][1]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private bubbleDown(i: number): void {
    const n = this.data.length;

    while (true) {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && this.data[l][1] > this.data[largest][1]) {
        largest = l;
      }

      if (r < n && this.data[r][1] > this.data[largest][1]) {
        largest = r;
      }

      if (largest === i) break;

      [this.data[i], this.data[largest]] = [
        this.data[largest],
        this.data[i],
      ];

      i = largest;
    }
  }
}

export function reorganizeString(s: string): string {
  const freq = new Map<string, number>();

  for (const char of s) {
    freq.set(char, (freq.get(char) ?? 0) + 1);
  }

  const heap = new MaxHeap();

  for (const [char, count] of freq.entries()) {
    heap.push([char, count]);
  }

  let result = '';

  while (heap.size > 1) {
    const [c1, f1] = heap.pop();
    const [c2, f2] = heap.pop();

    result += c1;
    result += c2;

    if (f1 - 1 > 0) heap.push([c1, f1 - 1]);
    if (f2 - 1 > 0) heap.push([c2, f2 - 1]);
  }

  if (heap.size === 1) {
    const [c, f] = heap.pop();
    if (f > 1) return '';
    result += c;
  }

  return result;
}
