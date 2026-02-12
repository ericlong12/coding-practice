/**
 * Hash Map with Sorted Key
 * Time Complexity: O(n * k log k)
 * Space Complexity: O(n)
 */
export function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const word of strs) {
    const key = word.split("").sort().join("");

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key)!.push(word);
  }

  return Array.from(map.values());
}
