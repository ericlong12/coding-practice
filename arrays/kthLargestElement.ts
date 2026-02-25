/**
 * Finds the kth largest element in an array.
 *
 * Strategy:
 * Maintain a min-heap of size k.
 * If heap grows larger than k, remove smallest.
 *
 * Time: O(n log k)
 * Space: O(k)
 */
export function kthLargestElement(
  numberArena: number[],
  kthPosition: number
): number {
  const minHeap: number[] = [];

  const swapChampions = (i: number, j: number) => {
    [minHeap[i], minHeap[j]] = [minHeap[j], minHeap[i]];
  };

  const bubbleUp = () => {
    let child = minHeap.length - 1;

    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);

      if (minHeap[parent] <= minHeap[child]) break;

      swapChampions(parent, child);
      child = parent;
    }
  };

  const bubbleDown = () => {
    let parent = 0;

    while (true) {
      let leftChild = parent * 2 + 1;
      let rightChild = parent * 2 + 2;
      let smallest = parent;

      if (
        leftChild < minHeap.length &&
        minHeap[leftChild] < minHeap[smallest]
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < minHeap.length &&
        minHeap[rightChild] < minHeap[smallest]
      ) {
        smallest = rightChild;
      }

      if (smallest === parent) break;

      swapChampions(parent, smallest);
      parent = smallest;
    }
  };

  for (const contender of numberArena) {
    minHeap.push(contender);
    bubbleUp();

    if (minHeap.length > kthPosition) {
      minHeap[0] = minHeap[minHeap.length - 1];
      minHeap.pop();
      bubbleDown();
    }
  }

  return minHeap[0];
}
