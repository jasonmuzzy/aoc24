import { NotImplemented, run } from 'aoc-copilot';
// import * as utils from 'aoc-copilot/dist/utils';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    throw new NotImplemented('Not implemented'); // <-- Replace with your solution (raising an exception forces printing the example input and answer to the console)
    for (let input of inputs) {
        const nums = (input.match(/-?\d+/g) ?? []).map(Number);
    }
    return answer;
}

run(__filename, solve); //, false, {
//     "reason": "Irregular format",
//     "part1length": 1,
//     "inputs": {
//         "selector": "code",
//         "indexes": []
//     },
//     "answers": {
//         "selector": "code",
//         "indexesOrLiterals": [] //,
//         // "transforms": [{
//         //     "functions": [
//         //         { "function": ["argument"] }
//         //     ], "appliesTo": [0]
//         // }]
//     }
// });