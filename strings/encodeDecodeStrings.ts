/**
 * Encode and Decode List of Strings
 * Uses length-prefix encoding
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

export function encode(strs: string[]): string {
  let result = "";

  for (const str of strs) {
    result += str.length + "#" + str;
  }

  return result;
}

export function decode(s: string): string[] {
  const result: string[] = [];
  let i = 0;

  while (i < s.length) {
    let j = i;
    while (s[j] !== "#") {
      j++;
    }

    const length = parseInt(s.slice(i, j), 10);
    const word = s.slice(j + 1, j + 1 + length);
    result.push(word);

    i = j + 1 + length;
  }

  return result;
}
