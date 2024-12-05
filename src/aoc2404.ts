import { run } from 'aoc-copilot';
import * as utils from 'aoc-copilot/dist/utils';

//       -------Part 1--------   -------Part 2--------
// Day       Time  Rank  Score       Time  Rank  Score
//   4   00:16:57  3332      0   00:23:03  2235      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    const words = inputs.map(input => input.split(''));
    for (let [y, row] of words.entries()) {
        for (let [x, char] of row.entries()) {
            if (part === 1) {
                if (char === 'X') {
                    for (let [x1, y1] of utils.adjacents(x, y, row.length, words.length, true)) {
                        if (words[y1][x1] === 'M' && y1 + 2 * (y1 - y) >= 0 && y1 + 2 * (y1 - y) < words.length && x1 + 2 * (x1 - x) >= 0 && x1 + 2 * (x1 - x) < row.length && words[y1 + y1 - y][x1 + x1 - x] === 'A' && words[y1 + 2 * (y1 - y)][x1 + 2 * (x1 - x)] === 'S') answer++;
                    }
                }
            } else {
                if (char === 'A' && x > 0 && x < row.length - 1 && y > 0 && y < words.length - 1) { // room for an X
                    if (words[y - 1][x - 1] === 'M' && words[y + 1][x + 1] === 'S') { // top left to BR   M S    M M
                        if ((words[y - 1][x + 1] === 'M' && words[y + 1][x - 1] === 'S') || // BL to TR    A  or  A
                            (words[y + 1][x - 1] === 'M' && words[y - 1][x + 1] === 'S')) { // TR to BL   M S    S S
                            answer++;
                        }
                    } else if (words[y + 1][x + 1] === 'M' && words[y - 1][x - 1] === 'S') { // BR to TL  S S    S M
                        if ((words[y - 1][x + 1] === 'M' && words[y + 1][x - 1] === 'S') || // BL to TR    A  or  A
                            (words[y + 1][x - 1] === 'M' && words[y - 1][x + 1] === 'S')) { // TR to BL   M M    S M
                            answer++;
                        }
                    }
                }

            }
        }
    }
    return answer;
}

run(__filename, solve);