import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  25   00:44:08   4061      0          -      -      -

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const keys: number[][] = [];
    const locks: number[][] = [];
    for (let i = 0; i < inputs.length; i += 8) {
        const heights = [0, 0, 0, 0, 0];
        for (let j = i; j < i + 7; j++) {
            for (let [k, v] of inputs[j].split('').entries()) {
                if (v === '#') heights[k]++;
            }
        }
        if (inputs[i] === '#####') locks.push(heights);
        else keys.push(heights);
    }
    for (let key of keys) {
        for (let lock of locks) {
            if (lock.every((v, i) => v + key[i] < 8)) answer++;
        }
    }
    return answer;
}

run(__filename, solve);