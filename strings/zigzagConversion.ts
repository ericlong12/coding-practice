/**
 * Zigzag Conversion
 *
 * Pattern: Simulation
 * Time: O(n)
 * Space: O(n)
 */

export function zigzagConversion(text: string, rowCount: number): string {
  if (rowCount === 1 || text.length <= rowCount) {
    return text;
  }

  const rows: string[] = new Array(rowCount).fill('');
  let currentRow = 0;
  let direction = -1;

  for (const char of text) {
    rows[currentRow] += char;

    if (currentRow === 0 || currentRow === rowCount - 1) {
      direction *= -1;
    }

    currentRow += direction;
  }

  return rows.join('');
}
