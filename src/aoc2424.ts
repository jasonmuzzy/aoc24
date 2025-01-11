import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  24   00:40:00   3217      0       >24h  15067      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const gates: Map<string, { in1: string, op: string, in2: string, out: string }> = new Map();
    const wires: Map<string, number> = new Map();
    inputs.forEach(input => {
        const es = input.split(/: | -> | /);
        if (es.length === 2) wires.set(es[0], parseInt(es[1]));
        else if (es.length === 4) gates.set(es[3], { in1: es[0], op: es[1], in2: es[2], out: es[3] });
    });
    if (part === 2) wires.forEach((_, k) => wires.set(k, 0)); // Default all wires to 0
    const max = [...gates.keys()].filter(gate => gate.startsWith('z')).length;
    function s(key: string): number {
        const gate = gates.get(key);
        if (gate === undefined) return 0;
        const op1 = wires.get(gate.in1) ?? s(gate.in1) ?? 0;
        const op2 = wires.get(gate.in2) ?? s(gate.in2) ?? 0;
        return gate.op === 'AND' ? op1 & op2 : gate.op === 'OR' ? op1 | op2 : op1 ^ op2;
    }
    function findGate(in1: string, op: string, in2: string) {
        return [...gates.values()].find(gate => gate.op === op && (gate.in1 === in1 || gate.in2 === in1 || gate.in1 === in2 || gate.in2 === in2));
    }
    const swaps: Set<string> = new Set();
    function swap(a: string, b: string) {
        swaps.add(a); swaps.add(b);
        const temp = Object.assign(gates.get(a)!, { out: b });
        gates.set(a, Object.assign(gates.get(b)!, { out: a }));
        gates.set(b, temp);
    }
    if (part === 1) return parseInt([...Array(max).keys()].reverse().reduce((bits, z) => bits + s(`z${z.toString().padStart(2, '0')}`), ''), 2);
    else {
        if (test) {
            for (let n = 0, nn = '00'; n < max; n++, nn = n.toString().padStart(2, '0')) {
                if ([[0, 0], [0, 1], [1, 0], [1, 1]].some(([a, b]) => {
                    wires.set('x' + nn, a);
                    wires.set('y' + nn, b);
                    const expected = a & b ? 2 ** n : 0;
                    const actual = parseInt([...Array(max).keys()].reverse().reduce((bits, z) => bits + s(`z${z.toString().padStart(2, '0')}`), ''), 2);;
                    wires.set('x' + nn, 0);
                    wires.set('y' + nn, 0);
                    return actual !== expected;
                })) swaps.add('z' + nn);
            }
        } else {
            let cin = { in1: '', op: '', in2: '', out: '' };
            for (let n = 0, nn = '00'; n < max - 1; n++, nn = n.toString().padStart(2, '0')) {
                const xor1 = findGate('x' + nn, 'XOR', 'y' + nn)!;
                const and1 = findGate('x' + nn, 'AND', 'y' + nn)!;
                if (n === 0) cin = and1;
                else {
                    const xor2 = findGate(xor1.out, 'XOR', cin.out)!;
                    const and2 = findGate(xor1.out, 'AND', cin.out)!;
                    if (xor2.out[0] !== 'z') swap(xor2.out, 'z' + nn);
                    else if (![xor1.out, cin.out].includes(xor2.in1) || ![xor1.out, cin.out].includes(xor2.in2)) swap(xor1.out, and1.out);
                    cin = findGate(and1.out, 'OR', and2.out)!;
                }
            }
        }
        return [...swaps].sort((a, b) => a < b ? -1 : 1).join(',');
    }
}

run(__filename, solve);