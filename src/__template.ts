import { NotImplemented, run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer: number | string = 0;
    throw new NotImplemented('Not implemented'); // <-- Replace with your solution (raising an exception forces printing the example input and answer to the console)
    return answer;
}

run(__filename, solve, false); //, {
    //     "reason": "Irregular format",
    //     "part1length": 1,
    //     "inputs": {
    //         "selector": "code",
    //         "indexes": []
    //     },
    //     "answers": {
    //         "selector": "code",
    //         "indexesOrLiterals": []
    //     // },
    //     // "additionalInfos": {
    //     //     "key": "steps",
    //     //     "selector": "code, em",
    //     //     "indexes": [],
    //     //     "transforms": [{
    //     //     "functions": [
    //     //             { "split": ["\n"] },
    //     //             { "at": [-2] },
    //     //             { "match": ["(?<=Result: ).*", ""] },
    //     //             { "at": [0] }
    //     //         ], "appliesTo": [0, 1, 2, 3]
    //     //     }]
    //     }
    // }); //, [{
    //     part: 1,
    //     inputs: ['Test case input'],
    //     answer: 'Expected answer'
    // }]);