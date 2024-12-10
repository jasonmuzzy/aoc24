import { run } from 'aoc-copilot';
import { adjacents, xyArray } from 'aoc-copilot/dist/utils';
import { dijkstra } from 'aoc-copilot/dist/distance';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  10   00:33:46   5238      0   01:02:59   7254      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const map = inputs.map(input => input.split('').map(v => v === '.' ? 11 : parseInt(v)));
    const graph: Map<string, Map<string, number>> = new Map();
    const starts: Set<string> = new Set();
    const ends: Set<string> = new Set();
    for (let [x1, y1] of xyArray(map)) {
        if (map[y1][x1] === 0) {
            starts.add(`${x1},${y1}`);
            if (!graph.has(`${x1},${y1}`)) graph.set(`${x1},${y1}`, new Map());
        }
        else if (map[y1][x1] === 9) ends.add(`${x1},${y1}`);
        for (let [x2, y2] of adjacents(x1, y1, map[y1].length, map.length)) {
            if (map[y2][x2] - map[y1][x1] === 1) {
                graph.set(`${x1},${y1}`, (graph.get(`${x1},${y1}`) ?? new Map()).set(`${x2},${y2}`, 1));
                if (!graph.has(`${x2},${y2}`)) graph.set(`${x2},${y2}`, new Map());
            }
        }
    }
    for (let start of starts) {
        if (part === 1) {
            const { distances } = dijkstra(graph, start);
            for (let distance of distances) {
                if (distance[1] < Infinity && ends.has(distance[0])) answer++;
            }
        } else {
            const stack: string[] = [start];
            while (stack.length > 0) {
                const node = stack.pop()!;
                const [x1, y1] = node.split(',').map(Number);
                if (map[y1][x1] === 9) {
                    answer++;
                    continue;
                }
                if (graph.has(node)) {
                    for (let neighbor of graph.get(node)!) {
                        stack.push(neighbor[0]);
                    }
                }
            }
        }
    }
    return answer;
}

run(__filename, solve);