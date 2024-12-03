import { run } from 'aoc-copilot';

// -------Part 1--------   -------Part 2--------
// Day       Time  Rank  Score       Time  Rank  Score
//   3   00:05:49  1942      0   00:42:15  8209      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const instructions = part === 1 ? [inputs.join('')] : inputs.join('').split(/(?=do\(\)|don\'t\(\))/g);
    for (let instruction of instructions.filter(inst => !inst.startsWith('don\'t()'))) {
        const nums = instruction.match(/(?<=mul\()\d+,\d+(?=\))/g) ?? [];
        answer += nums.map(num => num.split(',').map(Number).reduce((pv, cv) => pv * cv)).reduce((pv, cv) => pv + cv, 0);
    }
    return answer;
}

run(__filename, solve, true);