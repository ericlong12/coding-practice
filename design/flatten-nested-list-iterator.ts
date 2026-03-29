/**
 * Flatten Nested List Iterator
 *
 * Pattern: design, stack
 * Time: amortized O(1) next/hasNext
 * Space: O(n)
 *
 * Notes:
 * Flatten lazily using stack. Always expand lists on top.
 */

interface NestedInteger {
  isInteger(): boolean;
  getInteger(): number | null;
  getList(): NestedInteger[];
}

export class NestedIterator {
  private stack: NestedInteger[];

  constructor(nestedList: NestedInteger[]) {
    this.stack = [...nestedList].reverse();
  }

  next(): number {
    this.hasNext();
    return this.stack.pop()!.getInteger()!;
  }

  hasNext(): boolean {
    while (this.stack.length > 0) {
      const top = this.stack[this.stack.length - 1];

      if (top.isInteger()) {
        return true;
      }

      this.stack.pop();
      const list = top.getList();
      for (let i = list.length - 1; i >= 0; i--) {
        this.stack.push(list[i]);
      }
    }

    return false;
  }
}
