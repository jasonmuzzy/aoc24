import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//   8   00:17:27   2013      0   00:19:19   1159      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const map = inputs.map(row => row.split(''));
    const antennas: Map<string, string[]> = new Map();
    for (let [y, row] of map.entries()) {
        for (let [x, frequency] of row.entries()) {
            if (frequency !== '.') antennas.set(frequency, (antennas.get(frequency) ?? []).concat([`${x},${y}`]));
        }
    }
    const antinodes: Set<string> = new Set();
    for (let [y, row] of map.entries()) {
        for (let x of row.keys()) {
            for (let locations of antennas.values()) {
                for (let [i, xy1] of locations.entries()) {
                    const [x1, y1] = xy1.split(',').map(Number);
                    for (let xy2 of locations.slice(i + 1)) {
                        const [x2, y2] = xy2.split(',').map(Number);
                        if ((x === x1 && y === y1) ||
                            (x === x2 && y === y2) ||
                            ((x - x1) / (y - y1) === (x1 - x2) / (y1 - y2))) {
                            const d1 = Math.abs(x - x1) + Math.abs(y - y1);
                            const d2 = Math.abs(x - x2) + Math.abs(y - y2);
                            if (part === 2 || d1 === d2 * 2 || d1 * 2 === d2) {
                                antinodes.add(`${x},${y}`);
                            }
                        }
                    }
                }
            }
        }
    }
    answer = antinodes.size;
    return answer;
}

run(__filename, solve);