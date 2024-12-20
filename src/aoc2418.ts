import { run } from 'aoc-copilot';
import * as utils from 'aoc-copilot/dist/utils';
import { dijkstra } from 'aoc-copilot/dist/distance';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  18   01:14:57   5818      0   01:23:33   5346      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: string | number = 0;
    function csv(...vals: any[]) { return vals.join(','); }
    const memory: string[][] = [];
    for (let y = 0; y < (test ? 7 : 71); y++) memory.push('.'.repeat(test ? 7 : 71).split(''));
    for (let i = 0; i < (test ? 12 : 1024); i++) {
        const [x, y] = inputs[i].split(',').map(Number);
        memory[y][x] = '#';
    }
    const graph: Map<string, Map<string, number>> = new Map();
    for (let [y, row] of memory.entries()) {
        for (let [x, c] of row.entries()) {
            const neighbors: Map<string, number> = new Map();
            graph.set(csv(x, y), neighbors);
            for (let [nx, ny] of utils.adjacents(x, y, row.length, memory.length)) {
                if (memory[ny][nx] === '.') neighbors.set(csv(nx, ny), 1);
            }
        }
    }
    if (part === 1) {
        ({ distance: answer = Infinity } = dijkstra(graph, '0,0', test ? '6,6' : '70,70'));
    } else {
        for (let input of inputs.slice(test ? 12 : 1024)) {
            const [x, y] = input.split(',').map(Number);
            memory[y][x] = '#';
            const block = graph.get(csv(x, y));
            for (let neighbor of block!.keys()) {
                graph.get(neighbor)?.delete(csv(x, y));
            }
            const { distance } = dijkstra(graph, '0,0', test ? '6,6' : '70,70');
            if (distance === undefined) {
                answer = input;
                break;
            };
        }
    }
    return answer;
}

run(__filename, solve);