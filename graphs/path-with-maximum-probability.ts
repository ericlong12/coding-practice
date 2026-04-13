/**
 * Path with Maximum Probability
 *
 * Pattern: graph, modified dijkstra (max heap)
 * Time: O(E log V)
 * Space: O(V + E)
 *
 * Notes:
 * Instead of minimizing distance, we maximize probability.
 * Use max heap and multiply probabilities along the path.
 */

type Edge = [number, number];

class MaxHeap {
  private data: [number, number][] = []; // [probability, node]

  push(val: [number, number]): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): [number, number] | undefined {
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
      if (this.data[p][0] >= this.data[i][0]) break;
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

      if (l < n && this.data[l][0] > this.data[largest][0]) {
        largest = l;
      }

      if (r < n && this.data[r][0] > this.data[largest][0]) {
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

export function maxProbability(
  n: number,
  edges: number[][],
  succProb: number[],
  start: number,
  end: number,
): number {
  const graph: Map<number, Edge[]> = new Map();

  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    const prob = succProb[i];

    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);

    graph.get(u)!.push([v, prob]);
    graph.get(v)!.push([u, prob]);
  }

  const heap = new MaxHeap();
  heap.push([1, start]);

  const best = new Array<number>(n).fill(0);
  best[start] = 1;

  while (heap.size > 0) {
    const [prob, node] = heap.pop()!;

    if (node === end) return prob;
    if (prob < best[node]) continue;

    for (const [next, edgeProb] of graph.get(node) || []) {
      const newProb = prob * edgeProb;

      if (newProb > best[next]) {
        best[next] = newProb;
        heap.push([newProb, next]);
      }
    }
  }

  return 0;
}
