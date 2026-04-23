/**
 * Count Vowels Permutation
 *
 * Pattern: dp with transitions
 * Time: O(n)
 * Space: O(1)
 *
 * Notes:
 * Each vowel can only follow specific vowels.
 */

export function countVowelPermutation(n: number): number {
  const mod = 1_000_000_007;

  let a = 1, e = 1, i = 1, o = 1, u = 1;

  for (let step = 2; step <= n; step++) {
    const newA = (e + i + u) % mod;
    const newE = (a + i) % mod;
    const newI = (e + o) % mod;
    const newO = i % mod;
    const newU = (i + o) % mod;

    a = newA;
    e = newE;
    i = newI;
    o = newO;
    u = newU;
  }

  return (a + e + i + o + u) % mod;
}
