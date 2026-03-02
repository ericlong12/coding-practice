/**
 * Course Schedule
 *
 * Pattern: DFS + Cycle Detection (Topological Sort)
 * Time: O(V + E)
 * Space: O(V + E)
 *
 * Notes:
 * Build adjacency list. Use DFS with 3-state tracking:
 * 0 = unvisited
 * 1 = visiting
 * 2 = visited
 * If we encounter a visiting node again, there's a cycle.
 */

export function courseSchedule(
  numCourses: number,
  prerequisites: number[][]
): boolean {
  const adjacency: number[][] = new Array(numCourses)
    .fill(null)
    .map(() => []);

  for (const [course, prereq] of prerequisites) {
    adjacency[prereq].push(course);
  }

  const state: number[] = new Array(numCourses).fill(0);

  function dfs(course: number): boolean {
    if (state[course] === 1) return false;
    if (state[course] === 2) return true;

    state[course] = 1;

    for (const neighbor of adjacency[course]) {
      if (!dfs(neighbor)) return false;
    }

    state[course] = 2;
    return true;
  }

  for (let course = 0; course < numCourses; course++) {
    if (!dfs(course)) return false;
  }

  return true;
}
