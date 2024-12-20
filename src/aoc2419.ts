import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  19   00:31:44   3708      0   03:21:59   7702      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const towels = new Set(inputs[0].split(', '));
    const max = Math.max(...[...towels].map(v => v.length));
    const caches: Map<string, number> = new Map();
    function check(design: string): number {
        const cache = caches.get(design);
        if (cache !== undefined) return cache;
        let count = 0, sum = 0;
        if (design === '') sum = 1;
        else {
            for (let i = 1; i <= Math.min(max, design.length); i++) {
                let pattern = design.substring(0, i);
                if (towels.has(pattern)) {
                    count = check(design.substring(pattern.length));
                    sum += count;
                    if (part === 1 && count > 0) break;
                }
            }
        }
        caches.set(design, sum);
        return sum;
    }
    for (let design of inputs.slice(2)) {
        const count = check(design);
        answer += part === 2 ? count : count > 0 ? 1 : 0;
    }
    return answer;
}

run(__filename, solve);