import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  12   10:26:32  25783      0   19:20:55  24310      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const csv = (...args: any[]) => { return args.join(','); }
    const farm = inputs.map(row => row.split(''));
    const plots: Set<string> = new Set();
    for (let [y, row] of farm.entries()) {
        for (let [x, crop] of row.entries()) {
            if (plots.has(csv(x, y))) continue;
            let perims: [string, number, number][] = [];
            let a = 0, p = 0;
            const queue = [[x, y, crop]] as [number, number, string][];
            while (queue.length > 0) {
                const [x1, y1, crop] = queue.pop()!;
                if (plots.has(csv(x1, y1))) continue;
                plots.add(csv(x1, y1));
                a++;
                for (let [x2, y2] of [[x1, y1 - 1], [x1 + 1, y1], [x1, y1 + 1], [x1 - 1, y1]]) {
                    if (y2 === -1) { perims.push(['u', y1, x1]); p++; }
                    if (y2 === farm.length) { perims.push(['d', y1, x1]); p++; }
                    if (x2 === -1) { perims.push(['l', x1, y1]); p++; }
                    if (x2 === row.length) { perims.push(['r', x1, y1]); p++; }
                    if (y2 >= 0 && y2 < farm.length && x2 >= 0 && x2 < row.length) {
                        if (farm[y2][x2] === crop && !plots.has(csv(x2, y2))) queue.push([x2, y2, crop]);
                        else if (farm[y2][x2] !== crop) {
                            if (x2 === x1 && y2 < y1) perims.push(['u', y1, x1]);
                            else if (x2 === x1 && y2 > y1) perims.push(['d', y1, x1]);
                            else if (y2 === y1 && x2 < x1) perims.push(['l', x1, y1]);
                            else if (y2 === y1 && x2 > x1) perims.push(['r', x1, y1]);
                            p++;
                        }
                    }
                }
            }
            if (part === 1) answer += p * a;
            else {
                perims = perims.toSorted((a, b) => a[0] !== b[0] ? a[0].charCodeAt(0) - b[0].charCodeAt(0) : a[1] !== b[1] ? a[1] - b[1] : a[2] - b[2]);
                let edges = 0;
                let prev = ['', 0, 0] as [string, number, number];
                for (let perim of perims) {
                    if (perim[0] !== prev[0] || perim[1] !== prev[1] || perim[2] - prev[2] > 1) edges++;
                    prev = perim;
                }
                answer += edges * a;
            }
        }
    }
    return answer;
}

run(__filename, solve);