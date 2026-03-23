/**
 * Accounts Merge
 *
 * Pattern: Union Find
 * Time: O(n log n)
 * Space: O(n)
 *
 * Notes:
 * Union accounts based on shared emails.
 */

export function accountsMerge(accounts: string[][]): string[][] {
  const emailToIndex = new Map<string, number>();
  const emailToName = new Map<string, string>();

  let index = 0;

  for (const account of accounts) {
    const name = account[0];

    for (let i = 1; i < account.length; i++) {
      const email = account[i];

      if (!emailToIndex.has(email)) {
        emailToIndex.set(email, index++);
      }

      emailToName.set(email, name);
    }
  }

  const parent: number[] = new Array(index);
  for (let i = 0; i < index; i++) parent[i] = i;

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(a: number, b: number): void {
    parent[find(a)] = find(b);
  }

  for (const account of accounts) {
    const firstEmailIndex = emailToIndex.get(account[1])!;

    for (let i = 2; i < account.length; i++) {
      union(firstEmailIndex, emailToIndex.get(account[i])!);
    }
  }

  const groups = new Map<number, string[]>();

  for (const [email, idx] of emailToIndex) {
    const root = find(idx);

    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(email);
  }

  const result: string[][] = [];

  for (const emails of groups.values()) {
    emails.sort();
    result.push([emailToName.get(emails[0])!, ...emails]);
  }

  return result;
}
