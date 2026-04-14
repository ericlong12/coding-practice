/**
 * Course Schedule III
 *
 * Pattern: greedy + max heap
 * Time: O(n log n)
 * Space: O(n)
 *
 * Notes:
 * Sort by deadline, keep longest courses in max heap.
 * Remove longest when exceeding time.
 */

class MaxHeap {
  private data: number[] = [];

  push(val: number): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): number {
    const top = this.data[0];
    const last = this.data.pop()!;

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  peek(): number {
    return this.data[0];
  }

  get size(): number {
    return this.data.length;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p] >= this.data[i]) break;
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

      if (l < n && this.data[l] > this.data[largest]) {
        largest = l;
      }

      if (r < n && this.data[r] > this.data[largest]) {
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

export function scheduleCourse(courses: number[][]): number {
  courses.sort((a, b) => a[1] - b[1]);

  const heap = new MaxHeap();
  let time = 0;

  for (const [duration, lastDay] of courses) {
    time += duration;
    heap.push(duration);

    if (time > lastDay) {
      time -= heap.pop();
    }
  }

  return heap.size;
}
