/**
 * For each day, determines how many days until a warmer temperature.
 *
 * Strategy:
 * Use a monotonic decreasing stack storing indices.
 *
 * Time: O(n)
 * Space: O(n)
 */
export function dailyTemperatures(
  temperatureTimeline: number[]
): number[] {
  const daysUntilWarmth: number[] = new Array(temperatureTimeline.length).fill(0);
  const waitingRoomStack: number[] = [];

  for (let today = 0; today < temperatureTimeline.length; today++) {
    while (
      waitingRoomStack.length > 0 &&
      temperatureTimeline[today] >
        temperatureTimeline[waitingRoomStack[waitingRoomStack.length - 1]]
    ) {
      const coolerDayIndex = waitingRoomStack.pop()!;
      daysUntilWarmth[coolerDayIndex] = today - coolerDayIndex;
    }

    waitingRoomStack.push(today);
  }

  return daysUntilWarmth;
}
