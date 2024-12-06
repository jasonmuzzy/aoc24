import { run } from 'aoc-copilot';

//       -------Part 1--------   -------Part 2--------
// Day       Time  Rank  Score       Time  Rank  Score
//   5   00:13:59  2405      0   00:19:23  1463      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const [rules, updates] = inputs.join('\n').split('\n\n').map(p => p.split('\n'));
    const befores: Map<number, Set<number>> = new Map();
    for (let rule of rules) {
        const [l, r] = rule.split('|').map(Number);
        befores.set(l, (befores.get(l) ?? new Set()).add(r));
    }
    for (let update of updates) {
        const nums = update.split(',').map(Number);
        const ordered = nums.toSorted((a, b) => befores.get(a)?.has(b) ? -1 : 1); // Safe: every pair of updates exists as either A|B or B|A
        const inOrder = nums.every((n, i) => n === ordered[i]);
        answer += part === 1 && inOrder
            ? nums[Math.floor(nums.length / 2)]
            : part === 2 && !inOrder
                ? ordered[Math.floor(ordered.length / 2)]
                : 0;
    }
    return answer;
}

run(__filename, solve);