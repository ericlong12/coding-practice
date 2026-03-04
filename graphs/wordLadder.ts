/**
 * Word Ladder
 *
 * Pattern: BFS (Shortest Path in Unweighted Graph)
 * Time: O(N * L^2)
 * Space: O(N)
 *
 * Notes:
 * Treat each word as a node.
 * Generate neighbors by changing one character at a time.
 */

export function wordLadder(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue: [string, number][] = [[beginWord, 1]];

  while (queue.length > 0) {
    const [currentWord, level] = queue.shift()!;

    if (currentWord === endWord) return level;

    for (let i = 0; i < currentWord.length; i++) {
      for (let charCode = 97; charCode <= 122; charCode++) {
        const newWord =
          currentWord.slice(0, i) +
          String.fromCharCode(charCode) +
          currentWord.slice(i + 1);

        if (wordSet.has(newWord)) {
          queue.push([newWord, level + 1]);
          wordSet.delete(newWord);
        }
      }
    }
  }

  return 0;
}
