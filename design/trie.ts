/**
 * Implement Trie (Prefix Tree)
 *
 * Pattern: Tree Structure with Hash Map Children
 * Time: O(m) per operation
 * Space: O(total characters inserted)
 */

class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;

  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }

    current.isEnd = true;
  }

  search(word: string): boolean {
    const node = this.traverse(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  private traverse(word: string): TrieNode | null {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) return null;
      current = current.children.get(char)!;
    }

    return current;
  }
}
