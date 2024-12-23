import { run } from 'aoc-copilot';
import * as utils from 'aoc-copilot/dist/utils';
import { dijkstra } from 'aoc-copilot/dist/distance';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  20   00:30:33   1424      0   03:01:26   4178      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    function csv(...vals: any[]) { return vals.join(','); }
    let answer = 0, ps = !test ? 100 : part === 1 ? 1 : 50;
    const path = inputs.map(input => input.split(''));
    let ey = path.findIndex(row => row.includes('E'));
    let ex = path[ey].indexOf('E');
    const graph: Map<string, Map<string, number>> = new Map();
    for (let [y, row] of path.entries()) {
        if (y === 0 || y === path.length - 1) continue;
        for (let [x, v] of row.entries()) {
            if (v === '#' || x === 0 || x === path[y].length - 1) continue;
            const neighbors: Map<string, number> = new Map();
            for (let [nx, ny] of utils.adjacents(x, y, path[y].length, path.length)) {
                if (path[ny][nx] !== '#') neighbors.set(csv(nx, ny), 1);
            }
            if (neighbors.size > 0) graph.set(csv(x, y), neighbors);
        }
    }
    const { distances } = dijkstra(graph, csv(ex, ey)); // Distances to end
    const pathd = path.map((row, y) => row.map((v, x) => v === '#' ? Infinity : distances.get(csv(x, y)) ?? Infinity));
    for (let [y, row] of pathd.entries()) {
        if (y === 0 || y === path.length - 1) continue;
        for (let [x, d] of row.entries()) {
            if (d === Infinity) continue;
            for (let y2 = Math.max(0, y - (part === 1 ? 2 : 20)); y2 <= Math.min(pathd.length - 1, y + (part === 1 ? 2 : 20)); y2++) {
                for (let x2 = Math.max(0, x - (part === 1 ? 2 : 20) + Math.abs(y - y2)); x2 <= Math.min(row.length - 1, x + (part === 1 ? 2 : 20) - Math.abs(y - y2)); x2++) {
                    const cd = pathd[y2][x2];
                    const md = Math.abs(y - y2) + Math.abs(x - x2);
                    if (d - cd - md >= ps) answer++;
                }
            }
        }
    }
    return answer;
}

run(__filename, solve);