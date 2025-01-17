import { run } from 'aoc-copilot';
import * as q from 'aoc-copilot/dist/heap';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  16   01:05:17   4002      0   18:23:39  16452      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = Infinity;
    function csv(...vals: any[]) { return vals.join(','); }
    const facings = [
        ['^', { l: '<', r: '>', dx: 0, dy: -1 }],
        ['>', { l: '^', r: 'v', dx: 1, dy: 0 }],
        ['v', { l: '>', r: '<', dx: 0, dy: 1 }],
        ['<', { l: 'v', r: '^', dx: -1, dy: 0 }]
    ] as [string, { l: string, r: string, dx: number, dy: number }][];
    const graph: Map<string, Map<string, number>> = new Map();
    let start = { x: -1, y: -1, f: '>' };
    for (let [y, row] of inputs.entries()) {
        for (let [x, v] of row.split('').entries()) {
            if (v === '#') continue;
            else if (v === 'S') start = { x, y, f: '>' };
            for (let [f, { l, r, dx, dy }] of facings) {
                const neighbors = new Map([[csv(x, y, l), 1000], [csv(x, y, r), 1000]]);
                if (inputs[y + dy][x + dx] !== '#') neighbors.set(csv(x + dx, y + dy, f), 1); // Don't have to check for out of bounds because of # perimiter
                graph.set(csv(x, y, f), neighbors);
            }
        }
    }
    const distances: Map<string, number> = new Map();
    const allPrevs: Map<string, Set<string>> = new Map();
    const stack = [[0, start.x, start.y, start.f, -1, -1, '>']] as [number, number, number, string, number, number, string][];
    let ends: Set<string> = new Set();
    while (stack.length > 0) {
        const [d, x, y, f, px, py, pf] = q.pop(stack)!;
        if (inputs[y][x] === 'E') {
            if (d === answer) ends.add(csv(x, y, f));
            else if (d < answer) {
                answer = d;
                ends = new Set([csv(x, y, f)]);
            }
            if (part === 1 || d > answer) break;
        }
        const pd = distances.get(csv(x, y, f)) ?? Infinity;
        if (d > pd) continue;
        distances.set(csv(x, y, f), d);
        const prevs = (d === pd ? allPrevs.get(csv(x, y, f)) : undefined) ?? new Set() as Set<string>;
        prevs.add(csv(px, py, pf));
        allPrevs.set(csv(x, y, f), prevs);
        for (let [neighbor, nd] of graph.get(csv(x, y, f))!) {
            const [nx, ny, nf] = neighbor.split(',');
            q.push(stack, [d + nd, parseInt(nx), parseInt(ny), nf, x, y, f]);
        }
    }
    if (part === 2) {
        const backtrack: Set<string> = new Set();
        const stack = [...ends];
        while (stack.length > 0) {
            const xy = stack.pop()!;
            backtrack.add(xy.split(',').slice(0, 2).join(','));
            if (xy === csv(start.x, start.y, start.f)) continue;
            for (let prev of allPrevs.get(xy)!) {
                stack.push(prev);
            }
        }
        answer = backtrack.size;
    }
    return answer;
}

run(__filename, solve);