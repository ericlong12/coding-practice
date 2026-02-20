/**
 * Stack-Based Validation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function isValid(s: string): boolean {
  const stack: string[] = [];
  const map = new Map<string, string>([
    [")", "("],
    ["}", "{"],
    ["]", "["]
  ]);

  for (const char of s) {
    if (map.has(char)) {
      const top = stack.pop();
      if (top !== map.get(char)) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}
