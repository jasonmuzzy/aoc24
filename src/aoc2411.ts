import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  11   00:08:52   1866      0   00:40:26   3315      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let stones = inputs[0].split(' ').map(Number).reduce((pv, cv) => pv.set(cv, (pv.get(cv) ?? 0) + 1), new Map() as Map<number, number>);
    let temp: Map<number, number> = new Map();
    for (let blink = 0; blink < (part === 1 ? 25 : 75); blink++) {
        temp = new Map();
        for (let [stone, count] of stones) {
            if (stone === 0) temp.set(1, (temp.get(1) ?? 0) + count);
            else if (stone.toString().length % 2 === 0) {
                const digits = stone.toString();
                const lhs = parseInt(digits.substring(0, digits.length / 2));
                const rhs = parseInt(digits.substring(digits.length / 2));
                temp.set(lhs, (temp.get(lhs) ?? 0) + count);
                temp.set(rhs, (temp.get(rhs) ?? 0) + count);
            } else temp.set(stone * 2024, (temp.get(stone * 2024) ?? 0) + count);
        }
        stones = temp;
    }
    return [...stones.values()].reduce((pv, cv) => pv + cv);
}

run(__filename, solve);