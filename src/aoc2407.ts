import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//   7   00:38:33   6382      0   00:45:37   5472      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    for (let input of inputs) {
        const [check, ...rest] = (input.match(/-?\d+/g) ?? []).map(Number);
        for (let i = 0; i < (part === 1 ? 2 : 3) ** (rest.length - 1); i++) {
            const bits = i.toString(part === 1 ? 2 : 3).padStart(((part === 1 ? 2 : 3) ** (rest.length - 1) - 1).toString(part === 1 ? 2 : 3).length, '0');
            const val = rest.reduce((pv, cv, j) => {
                if (bits[j - 1] === '0') return pv + cv;
                else if (bits[j - 1] === '1') return pv * cv;
                else return parseInt(`${pv}${cv}`);
            });
            if (val === check) {
                answer += check;
                break;
            }
        }
    }
    return answer;
}

run(__filename, solve);