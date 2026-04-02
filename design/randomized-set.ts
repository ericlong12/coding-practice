/**
 * Insert Delete GetRandom O(1)
 *
 * Pattern: design, hashmap + array
 * Time: O(1) average
 * Space: O(n)
 *
 * Notes:
 * Array stores values, map stores index. Swap with last on removal.
 */

export class RandomizedSet {
  private values: number[];
  private indexMap: Map<number, number>;

  constructor() {
    this.values = [];
    this.indexMap = new Map();
  }

  insert(val: number): boolean {
    if (this.indexMap.has(val)) return false;

    this.values.push(val);
    this.indexMap.set(val, this.values.length - 1);
    return true;
  }

  remove(val: number): boolean {
    if (!this.indexMap.has(val)) return false;

    const index = this.indexMap.get(val)!;
    const last = this.values[this.values.length - 1];

    this.values[index] = last;
    this.indexMap.set(last, index);

    this.values.pop();
    this.indexMap.delete(val);

    return true;
  }

  getRandom(): number {
    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex];
  }
}
