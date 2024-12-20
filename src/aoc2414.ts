import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  14   16:00:37  29267      0   19:33:53  27327      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const mod = (n: number, d: number) => { return ((n % d) + d) % d; }
    let quadrants = [0, 0, 0, 0];
    const area: string[][] = [];
    for (let y = 0; y < (test ? 7 : 103); y++) area.push('.'.repeat(test ? 11 : 101).split(''));
    for (let t = 1; t <= (part === 1 ? 100 : Infinity); t++) {
        const temp = area.map(row => [...row]);
        for (let input of inputs) {
            let [x, y, dx, dy] = (input.match(/-?\d+/g) ?? []).map(Number);
            x = mod(x + dx * t, test ? 11 : 101);
            y = mod(y + dy * t, test ? 7 : 103);
            temp[y][x] = '*';
            if (part === 1 && t === 100) {
                if (y < (test ? 3 : 51) && x < (test ? 5 : 50)) quadrants[0]++;
                else if (y < (test ? 3 : 51) && x > (test ? 5 : 50)) quadrants[1]++;
                else if (y > (test ? 3 : 51) && x < (test ? 5 : 50)) quadrants[2]++;
                else if (y > (test ? 3 : 51) && x > (test ? 5 : 50)) quadrants[3]++;
            }
        }
        if (part === 2) {
            if (temp.map(row => row.join('')).join('\n').includes('**********')) {
                quadrants = [t, 1, 1, 1];
                break;
            }
        }
    }
    return quadrants.reduce((pv, cv) => pv * cv);
}

run(__filename, solve);