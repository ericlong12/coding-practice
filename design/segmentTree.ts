/**
 * Segment Tree (Range Sum Query)
 *
 * Pattern: Tree Data Structure
 * Time: O(log n) query/update
 * Space: O(n)
 *
 * Notes:
 * Supports efficient range queries and point updates.
 */

export class SegmentTree {
  private tree: number[];
  private n: number;

  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array(this.n * 4).fill(0);
    this.build(nums, 0, 0, this.n - 1);
  }

  private build(nums: number[], node: number, left: number, right: number): void {
    if (left === right) {
      this.tree[node] = nums[left];
      return;
    }

    const mid = Math.floor((left + right) / 2);
    this.build(nums, node * 2 + 1, left, mid);
    this.build(nums, node * 2 + 2, mid + 1, right);

    this.tree[node] =
      this.tree[node * 2 + 1] + this.tree[node * 2 + 2];
  }

  update(index: number, value: number): void {
    this.updateHelper(0, 0, this.n - 1, index, value);
  }

  private updateHelper(
    node: number,
    left: number,
    right: number,
    index: number,
    value: number
  ): void {
    if (left === right) {
      this.tree[node] = value;
      return;
    }

    const mid = Math.floor((left + right) / 2);

    if (index <= mid) {
      this.updateHelper(node * 2 + 1, left, mid, index, value);
    } else {
      this.updateHelper(node * 2 + 2, mid + 1, right, index, value);
    }

    this.tree[node] =
      this.tree[node * 2 + 1] + this.tree[node * 2 + 2];
  }

  query(left: number, right: number): number {
    return this.queryHelper(0, 0, this.n - 1, left, right);
  }

  private queryHelper(
    node: number,
    start: number,
    end: number,
    left: number,
    right: number
  ): number {
    if (right < start || end < left) return 0;

    if (left <= start && end <= right) {
      return this.tree[node];
    }

    const mid = Math.floor((start + end) / 2);

    return (
      this.queryHelper(node * 2 + 1, start, mid, left, right) +
      this.queryHelper(node * 2 + 2, mid + 1, end, left, right)
    );
  }
}
