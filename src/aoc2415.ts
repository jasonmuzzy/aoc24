import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  15   00:27:15   1814      0       >24h  24828      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const [p1, p2] = inputs.join('\n').split('\n\n');
    const warehouse = p1.split('\n').map(v => v.split('').map(c => part === 1 ? c : c === 'O' ? '[]' : c === '@' ? '@.' : c + c).join('').split(''));
    let y = warehouse.findIndex(row => row.includes('@'));
    let x = warehouse[y].indexOf('@');
    const moves = p2.replaceAll('\n', '').split('');
    const csv = (...vals: any[]) => { return vals.join(','); }
    for (let move of moves) {
        const dy = move === '^' ? -1 : move === 'v' ? 1 : 0;
        const dx = move === '<' ? -1 : move === '>' ? 1 : 0;
        let canMove = true;
        const movables: Set<string> = new Set();
        const stack: [number, number][] = [[x, y]];
        while (stack.length > 0) {
            const [nx, ny] = stack.pop()!;
            if (warehouse[ny][nx] === '.' || movables.has(csv(nx, ny))) continue;
            movables.add(csv(nx, ny));
            const nv = warehouse[ny + dy][nx + dx];
            if (nv === '#') { // Wall: stop
                canMove = false;
                break;
            }
            if ('O[]'.includes(nv)) {
                stack.push([nx + dx, ny + dy]);
                if (part === 2 && '^v'.includes(move)) stack.push([nx + dx + (nv === '[' ? 1 : -1), ny + dy]);
            }
        }
        if (canMove) {
            for (let [nx, ny] of [...movables].map(v => v.split(',').map(Number) as [number, number]).toSorted(([x1, y1], [x2, y2]) => {
                if (move === '<') return x1 - x2;
                else if (move === '>') return x2 - x1;
                else if (move === '^') return y1 - y2;
                else return y2 - y1;
            })) {
                warehouse[ny + dy][nx + dx] = warehouse[ny][nx];
                warehouse[ny][nx] = '.';
            }
            x += dx;
            y += dy;
        }
    }
    answer = warehouse.reduce((p1, row, y) => p1 + row.reduce((p2, v, x) => p2 + ('O['.includes(v) ? y * 100 + x : 0), 0), 0);
    return answer;
}

run(__filename, solve);