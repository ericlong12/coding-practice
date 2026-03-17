/**
 * Find Median from Data Stream
 *
 * Pattern: Two Heaps
 * Time: O(log n) per insertion
 * Space: O(n)
 *
 * Notes:
 * Max heap for lower half, min heap for upper half.
 */

export class MedianFinder {
  private maxHeap: number[] = [];
  private minHeap: number[] = [];

  addNum(num: number): void {
    this.maxHeap.push(num);
    this.maxHeap.sort((a, b) => b - a);

    this.minHeap.push(this.maxHeap.shift()!);
    this.minHeap.sort((a, b) => a - b);

    if (this.minHeap.length > this.maxHeap.length) {
      this.maxHeap.push(this.minHeap.shift()!);
      this.maxHeap.sort((a, b) => b - a);
    }
  }

  findMedian(): number {
    if (this.maxHeap.length > this.minHeap.length) {
      return this.maxHeap[0];
    }

    return (this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}
