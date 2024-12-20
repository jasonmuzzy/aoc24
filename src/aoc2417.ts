import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  17   01:46:11   6458      0       >24h  19957      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | bigint | string> {
    const code = inputs[4].substring(9), program = code.split(',').map(Number);
    let a = part === 1 ? BigInt(inputs[0].substring(12)) : 0n;
    if (part === 1) return vm(program, a);
    else {
        let a = 0n, output = vm(program, a);
        const mults = Array(program.length).fill(0n);
        let quine = output.split(',').map(Number);
        for (let i = program.length - 1; i >= 0; i--) { // Work right to left
            while (output.length < code.length || quine[i] !== program[i]) {
                mults[i]++; // we divide a by 8 (2**3) each pass (assuming the adv argument is always 3), so we can change element i by multiplying by 8 ** i
                a = mults.reduce((pv, cv, i) => pv + cv * 8n ** BigInt(i));
                output = vm(program, a);
                quine = output.split(',').map(Number);
            }
        }
        return a;
    }
}

function vm(program: number[], a: bigint) {
    function mod(n: bigint, d: bigint) { return ((n % d) + d) % d; }
    let out = '', b = 0n, c = 0n;
    for (let pointer = 0; pointer < program.length; pointer += 2) {
        const [opcode, arg] = [program[pointer], program[pointer + 1]];
        const combo = () => { return arg <= 3 ? BigInt(arg) : arg === 4 ? a : arg === 5 ? b : c; }
        if (opcode === 0) a /= 2n ** combo(); // adv
        else if (opcode === 1) b ^= BigInt(arg); // bxl
        else if (opcode === 2) b = mod(combo(), 8n); // bst
        else if (opcode === 3) pointer = a === 0n ? pointer : arg - 2; // jnz
        else if (opcode === 4) b ^= c; // bxz
        else if (opcode === 5) out += (out === '' ? '' : ',') + mod(combo(), 8n).toString(); // out
        else if (opcode === 6) b = a / 2n ** combo(); // bdv
        else if (opcode === 7) c = a / 2n ** combo(); // cdv
    }
    return out;
}

run(__filename, solve);