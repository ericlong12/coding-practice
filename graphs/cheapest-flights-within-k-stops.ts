/**
 * Cheapest Flights Within K Stops
 *
 * Pattern: graph, modified dijkstra / bfs with state
 * Time: O(E log V)
 * Space: O(V * K)
 *
 * Notes:
 * State includes (node, stops). We cannot use standard Dijkstra directly
 * because fewer stops may be worse cost and vice versa.
 */

type State = {
  node: number;
  cost: number;
  stops: number;
};

class MinHeap {
  private data: State[] = [];

  push(val: State): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): State | undefined {
    if (this.data.length === 0) return undefined;

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
      if (this.data[p].cost <= this.data[i].cost) break;
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

      if (l < n && this.data[l].cost < this.data[smallest].cost) {
        smallest = l;
      }

      if (r < n && this.data[r].cost < this.data[smallest].cost) {
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

export function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number,
): number {
  const graph: Map<number, [number, number][]> = new Map();

  for (const [u, v, w] of flights) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u)!.push([v, w]);
  }

  const heap = new MinHeap();
  heap.push({ node: src, cost: 0, stops: 0 });

  const best = new Map<string, number>();

  while (heap.size > 0) {
    const { node, cost, stops } = heap.pop()!;

    if (node === dst) return cost;
    if (stops > k) continue;

    const key = `${node}-${stops}`;
    if (best.has(key) && best.get(key)! < cost) continue;
    best.set(key, cost);

    for (const [next, price] of graph.get(node) || []) {
      heap.push({
        node: next,
        cost: cost + price,
        stops: stops + 1,
      });
    }
  }

  return -1;
}
