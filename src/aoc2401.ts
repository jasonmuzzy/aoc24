import { run } from 'aoc-copilot';

// -------Part 1--------   -------Part 2--------
// Day       Time  Rank  Score       Time  Rank  Score
//   1   00:07:01  3058      0   00:11:22  3167      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const twolists = inputs.map(input => (input.match(/\d+/g) ?? []).map(Number));
    const list1 = twolists.map(l => l[0]).sort((a, b) => a - b);
    const list2 = twolists.map(l => l[1]).sort((a, b) => a - b);
    answer = part === 1
        ? list1.reduce((pv, cv, i) => pv + Math.abs(cv - list2[i]), 0)
        : list1.reduce((pv, cv) => pv + cv * list2.filter(n2 => n2 === cv).length, 0);
    return answer;
}

run(__filename, solve);