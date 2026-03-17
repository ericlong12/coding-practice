/**
 * Word Search II
 *
 * Pattern: Trie + Backtracking
 * Time: O(m * n * 4^L)
 * Space: O(n)
 *
 * Notes:
 * Build a trie for fast prefix checking.
 * Backtrack on the board to find words.
 */

class TrieNode {
  children: Map<string, TrieNode>;
  word: string | null;

  constructor() {
    this.children = new Map();
    this.word = null;
  }
}

export function wordSearchII(board: string[][], words: string[]): string[] {
  const root = new TrieNode();

  for (const word of words) {
    let node = root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.word = word;
  }

  const result: string[] = [];
  const rows = board.length;
  const cols = board[0].length;

  function dfs(row: number, col: number, node: TrieNode): void {
    if (
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols
    ) return;

    const char = board[row][col];
    if (!node.children.has(char)) return;

    const nextNode = node.children.get(char)!;

    if (nextNode.word) {
      result.push(nextNode.word);
      nextNode.word = null;
    }

    board[row][col] = "#";

    dfs(row + 1, col, nextNode);
    dfs(row - 1, col, nextNode);
    dfs(row, col + 1, nextNode);
    dfs(row, col - 1, nextNode);

    board[row][col] = char;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return result;
}
