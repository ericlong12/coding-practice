/**
 * Reverse Bits
 *
 * Pattern: Bit Manipulation (Shifting)
 * Time: O(32)
 * Space: O(1)
 *
 * Notes:
 * Shift result left and append least significant bit.
 */

export function reverseBits(n: number): number {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    result <<= 1;
    result |= n & 1;
    n >>>= 1;
  }

  return result >>> 0;
}
