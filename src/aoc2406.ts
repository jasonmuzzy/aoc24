import { run } from 'aoc-copilot';
import { xyArray } from 'aoc-copilot/dist/utils';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//   6   11:13:34  46865      0   11:29:05  28003      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const lab = inputs.map(input => input.split(''));
    if (part === 1) return walk(lab);
    else {
        let answer = 0;
        for (let [x, y] of xyArray(lab)) {
            if (lab[y][x] === '.') {
                const obstructed = lab.map((row, y1) => row.map((cell, x1) => x1 === x && y1 === y ? '#' : cell));
                if (walk(obstructed) === Infinity) answer++;
            }
        }
        return answer;
    }

    function walk(lab: string[][]) {
        let d = '^';
        let y = lab.findIndex(row => row.includes(d));
        let x = lab[y].indexOf(d);
        const path: Set<string> = new Set();
        const pathd: Set<string> = new Set();
        while (x >= 0 && x < lab[y].length && y >= 0 && y < lab.length) {
            if (pathd.has(`${x},${y},${d}`)) return Infinity;
            pathd.add(`${x},${y},${d}`);
            path.add(`${x},${y}`);
            if (d === '^') {
                if (y === 0) break;
                else if (lab[y - 1][x] !== '#') y--;
                else d = '>';
            } else if (d === '>') {
                if (x === lab[y].length - 1) break;
                else if (lab[y][x + 1] !== '#') x++;
                else (d = 'v');
            } else if (d === 'v') {
                if (y === lab.length - 1) break;
                else if (lab[y + 1][x] !== '#') y++;
                else (d = '<');
            } else {
                if (x === 0) break;
                else if (lab[y][x - 1] !== '#') x--;
                else (d = '^');
            }
        }
        return path.size;
    }
}

run(__filename, solve);