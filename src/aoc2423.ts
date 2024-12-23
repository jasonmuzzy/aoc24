import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  23   00:09:30   1018      0   00:38:13   1712      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const pairs = inputs.map(i => i.split('-')).reduce((pv, [lhs, rhs]) => {
        pv.set(lhs, (pv.get(lhs) ?? new Set()).add(rhs));
        pv.set(rhs, (pv.get(rhs) ?? new Set()).add(lhs));
        return pv;
    }, new Map() as Map<string, Set<string>>);
    const conns: Set<string> = new Set();
    for (let [lhs, pcs] of [...pairs.entries()]) {
        for (let rhs of pcs) {
            const mini: Set<string> = new Set([lhs, rhs]);
            for (let other of pcs) {
                if (part === 1 && pairs.get(rhs)?.has(other) && (lhs.startsWith('t') || rhs.startsWith('t') || other.startsWith('t'))) {
                    conns.add([lhs, rhs, other].sort((a, b) => a < b ? -1 : 1).join(','));
                } else if ([...mini].every(m => pairs.get(m)?.has(other))) mini.add(other);
            }
            if (part === 2) conns.add([...mini].sort((a, b) => a < b ? -1 : 1).join(','));
        }
    }
    return part === 1 ? conns.size : [...conns].reduce((pv, cv) => cv.length > pv.length ? cv : pv, '');
}

run(__filename, solve);