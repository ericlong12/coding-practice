/**
 * Concatenated Words
 *
 * Pattern: trie + dfs
 * Time: O(n * L^2)
 * Space: O(n * L)
 *
 * Notes:
 * Build trie of all words. For each word, try to split into smaller words
 * using DFS. Skip the word itself during check.
 */

class TrieNode {
  children: Map<string, TrieNode>;
  isWord: boolean;

  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isWord = true;
  }
}

export function findAllConcatenatedWordsInADict(words: string[]): string[] {
  const trie = new Trie();

  for (const word of words) {
    if (word.length > 0) {
      trie.insert(word);
    }
  }

  function dfs(word: string, index: number, count: number): boolean {
    let node = trie.root;

    for (let i = index; i < word.length; i++) {
      const char = word[i];
      if (!node.children.has(char)) return false;

      node = node.children.get(char)!;

      if (node.isWord) {
        if (i === word.length - 1) {
          return count >= 1;
        }
        if (dfs(word, i + 1, count + 1)) {
          return true;
        }
      }
    }

    return false;
  }

  const result: string[] = [];

  for (const word of words) {
    if (word.length === 0) continue;
    if (dfs(word, 0, 0)) {
      result.push(word);
    }
  }

  return result;
}
