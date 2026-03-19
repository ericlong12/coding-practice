/**
 * Fenwick Tree (Binary Indexed Tree)
 *
 * Pattern: Prefix Sum Optimization
 * Time: O(log n)
 * Space: O(n)
 *
 * Notes:
 * Supports prefix sums and updates efficiently.
 */

export class FenwickTree {
  private tree: number[];
  private n: number;

  constructor(size: number) {
    this.n = size;
    this.tree = new Array(size + 1).fill(0);
  }

  update(index: number, delta: number): void {
    index++;

    while (index <= this.n) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  query(index: number): number {
    index++;
    let sum = 0;

    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }

    return sum;
  }

  rangeQuery(left: number, right: number): number {
    return this.query(right) - this.query(left - 1);
  }
}
