/**
 * Meeting Rooms III
 *
 * Pattern: heap + simulation
 * Time: O(n log n)
 * Space: O(n)
 *
 * Notes:
 * One heap for available rooms, one for ongoing meetings.
 * Always assign earliest available room.
 */

class MinHeap {
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

  size(): number {
    return this.data.length;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private bubbleDown(i: number): void {
    const n = this.data.length;

    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && this.data[l] < this.data[smallest]) {
        smallest = l;
      }

      if (r < n && this.data[r] < this.data[smallest]) {
        smallest = r;
      }

      if (smallest === i) break;

      [this.data[i], this.data[smallest]] = [
        this.data[smallest],
        this.data[i],
      ];

      i = smallest;
    }
  }
}

export function mostBooked(n: number, meetings: number[][]): number {
  meetings.sort((a, b) => a[0] - b[0]);

  const available = new MinHeap();
  for (let i = 0; i < n; i++) {
    available.push(i);
  }

  const used: [number, number][] = []; // [endTime, room]
  const counts = new Array(n).fill(0);

  function pushUsed(entry: [number, number]) {
    used.push(entry);
    used.sort((a, b) => a[0] - b[0]);
  }

  for (const [start, end] of meetings) {
    while (used.length > 0 && used[0][0] <= start) {
      const [, room] = used.shift()!;
      available.push(room);
    }

    if (available.size() > 0) {
      const room = available.pop();
      counts[room]++;
      pushUsed([end, room]);
    } else {
      const [earliestEnd, room] = used.shift()!;
      counts[room]++;
      pushUsed([earliestEnd + (end - start), room]);
    }
  }

  let bestRoom = 0;

  for (let i = 1; i < n; i++) {
    if (counts[i] > counts[bestRoom]) {
      bestRoom = i;
    }
  }

  return bestRoom;
}
