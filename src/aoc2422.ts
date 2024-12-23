import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  22   14:32:53  17031      0   16:12:26  14273      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    function mod(n: number, d: number) { return ((n % d) + d) % d; }
    const sequences: Map<string, number> = new Map();
    let secret = 0, price = 0, lastPrice = 0, delta = 0;
    let key = '', minus1 = 0, minus2 = 0, minus3 = 0;
    for (let input of inputs) {
        const firstSequences: Set<string> = new Set();
        delta = 0, minus1 = 0, minus2 = 0, minus3 = 0;
        secret = parseInt(input);
        for (let i = 0; i < 2000; i++) {
            secret = mod((secret * 64) ^ secret, 16777216);
            secret = mod(Math.floor(secret / 32) ^ secret, 16777216);
            secret = mod((secret * 2048) ^ secret, 16777216);
            if (part === 2) {
                price = secret % 10;
                if (i > 0) {
                    minus3 = minus2;
                    minus2 = minus1;
                    minus1 = delta;
                    delta = price - lastPrice;
                    if (i > 3) {
                        key = [minus3, minus2, minus1, delta].join(',');
                        if (!firstSequences.has(key)) {
                            firstSequences.add(key);
                            sequences.set(key, (sequences.get(key) ?? 0) + price);
                        }
                    }
                }
                lastPrice = price;
            }
        }
        answer += secret;
    }
    if (part === 2) answer = Math.max(...[...sequences.values()]);
    return answer;
}

run(__filename, solve);