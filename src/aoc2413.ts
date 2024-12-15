import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    // There are 2 claw machines with a/b buttons that both lead to prizes at the same x,y distance so
    // we can just set the equations equal to each other, solve for b, and then substitute that into
    // the formula and solve for a.  Formulas:  ax' + bx'' - x''' = 0 and ay' + by'' - y''' = 0.
    for (let machine of inputs.join('\n').split('\n\n')) {
        let [x1, y1, x2, y2, x3, y3] = (machine.match(/\d+/g) ?? []).map((v, i) => parseInt(v) + (part === 2 && i > 3 ? 10000000000000 : 0));
        const a = (x3 * (x2 - y2) - x2 * (x3 - y3)) / (x1 * (x2 - y2) + x2 * (y1 - x1));
        const b = (x3 - x1 * a) / x2;
        if (a === Math.floor(a) && b === Math.floor(b)) answer += a * 3 + b;
    }
    return answer;
}

run(__filename, solve);