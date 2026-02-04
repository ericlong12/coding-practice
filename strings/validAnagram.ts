/**
 * Valid Anagram
 * Given two strings s and t, return true if t is an anagram of s.
 *
 * Example:
 * s = "anagram", t = "nagaram" -> true
 * s = "rat", t = "car" -> false
 */

export function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const charCount: Map<string, number> = new Map();

    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    for (const char of t) {
        if (!charCount.has(char)) return false;

        const count = charCount.get(char)! - 1;
        if (count === 0) {
            charCount.delete(char);
        } else {
            charCount.set(char, count);
        }
    }

    return charCount.size === 0;
}

/**
 * Time Complexity: O(n)
 * Space Complexity: O(1) — bounded by alphabet size
 */
