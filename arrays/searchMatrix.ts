/**
 * Searches for a target in a row-wise sorted 2D matrix.
 *
 * Pattern:
 * Binary Search over virtual 1D array
 *
 * Time: O(log(m * n))
 * Space: O(1)
 */
export function searchMatrix(
  numberGrid: number[][],
  hiddenTreasure: number
): boolean {
  if (numberGrid.length === 0 || numberGrid[0].length === 0) {
    return false;
  }

  const rowCount = numberGrid.length;
  const columnCount = numberGrid[0].length;

  let leftProbe = 0;
  let rightProbe = rowCount * columnCount - 1;

  while (leftProbe <= rightProbe) {
    const middleProbe = Math.floor((leftProbe + rightProbe) / 2);

    const row = Math.floor(middleProbe / columnCount);
    const col = middleProbe % columnCount;

    const discoveredValue = numberGrid[row][col];

    if (discoveredValue === hiddenTreasure) {
      return true;
    }

    if (discoveredValue < hiddenTreasure) {
      leftProbe = middleProbe + 1;
    } else {
      rightProbe = middleProbe - 1;
    }
  }

  return false;
}
