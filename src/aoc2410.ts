import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  10   00:33:46   5238      0   01:02:59   7254      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const graph: Map<string, Set<string>> = new Map();
    const starts: Set<string> = new Set(), ends: Set<string> = new Set();
    for (let [y1, row] of inputs.entries()) {
        for (let [x1, v] of row.split('').entries()) {
            if (v !== '.') {
                if (v === '0') starts.add(`${x1},${y1}`);
                if (v === '9') ends.add(`${x1},${y1}`);
                for (let [x2, y2] of [[x1, y1 - 1], [x1 + 1, y1], [x1, y1 + 1], [x1 - 1, y1]]) {
                    if (y2 >= 0 && y2 < inputs.length && x2 >= 0 && x2 < inputs[y2].length && parseInt(inputs[y2][x2]) - parseInt(inputs[y1][x1]) === 1) {
                        graph.set(`${x1},${y1}`, (graph.get(`${x1},${y1}`) ?? new Set()).add(`${x2},${y2}`));
                    }
                }
            }
        }
    }
    for (let start of starts) {
        const reached: Set<string> = new Set();
        const stack = [start];
        while (stack.length > 0) {
            const node = stack.pop()!;
            if (!graph.has(node)) continue;
            for (let neighbor of graph.get(node)!) {
                if (ends.has(neighbor)) {
                    if (part === 1) reached.add(neighbor);
                    else answer++;
                } else stack.push(neighbor);
            }
        }
        if (part === 1) answer += reached.size;
    }
    return answer;
}

run(__filename, solve);