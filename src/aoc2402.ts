import { run } from 'aoc-copilot';

// -------Part 1--------   -------Part 2--------
// Day       Time  Rank  Score       Time  Rank  Score
//   2   00:19:15  6615      0   00:33:57  5250      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const safe = (levels: number[]) => {
        return levels.every((v, i, a) => i === 0 || (v - a[i - 1] >= 1 && v - a[i - 1] <= 3)) ||
            levels.every((v, i, a) => i === 0 || (v - a[i - 1] >= -3 && v - a[i - 1] <= -1));
    }
    for (let report of inputs) {
        const levels = (report.match(/\d+/g) ?? []).map(Number);
        if (safe(levels)) answer++;
        else if (part === 2) {
            for (let i = 0; i < levels.length; i++) {
                const dampenedLevels = levels.filter((_, j) => j !== i);
                if (safe(dampenedLevels)) {
                    answer++;
                    break;
                }
            }
        }
    }
    return answer;
}

run(__filename, solve);