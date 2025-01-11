import { run } from 'aoc-copilot';
import { permutations } from 'aoc-copilot/dist/utils';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//  21       >24h  19954      0       >24h  17174      0

class KeyPad {
    public paths: Map<string, string[]> = new Map();

    constructor(public keys: string) {
        for (let from of keys) {
            if (from === ' ') continue;
            for (let to of keys) {
                if (to === ' ') continue;
                const [x1, y1] = this.xy(from);
                const [x2, y2] = this.xy(to);
                let path = '';
                for (let x = 0; x < Math.abs(x1 - x2); x++) path += (x1 < x2 ? '>' : '<');
                for (let y = 0; y < Math.abs(y1 - y2); y++) path += (y1 < y2 ? 'v' : '^');
                const allPaths = permutations(path.split(''))
                    // Keep unique paths
                    .filter((v, i, a) => i === a.findIndex(row => row.every((e, x) => e === v[x])))
                    // Keep routes that avoid the gap (avoid robot panic)
                    .filter((v) => {
                        let px = x1, py = y1;
                        for (let d of v) {
                            px += d === '>' ? 1 : d === '<' ? -1 : 0;
                            py += d === 'v' ? 1 : d === '^' ? -1 : 0;
                            if (this.at(px, py) === ' ') return false;
                        }
                        return true;
                        // Keep shorter paths
                    }).filter((v, i, a) => v.length <= Math.min(...a.map(row => row.length)));
                const turns = (path: string[]) => path.reduce((pv, cv, i, a) => pv + (i === 0 || cv === a[i - 1] ? 0 : 1), 0);
                const minTurns = Math.min(...allPaths.map(row => turns(row)));
                // Keep paths that make fewer turns since then we can just hit A twice in a row e.g. v<< instead of <v<
                this.paths.set(from + to, allPaths.filter(v => turns(v) <= minTurns).map(row => row.join('') + 'A'));
            }
        }
    }

    at(x: number, y: number) {
        return this.keys[y * 3 + x];
    }

    options(original: string, dpad: KeyPad) {

        // Original, e.g. '>vA'

        /* Each segment represents all of the path options for each step of the original path, e.g.:
        [ 
            ['vA'],         // >
            ['<A'],         // v
            ['>^A', '^>A']  // A
        ] */
        let segments: string[][] = [];
        let at = 'A';
        for (let key of original) {
            segments.push(dpad.paths.get(at + key)!);
            at = key;
        }

        /* Options are all the combinations of segment paths, e.g.:
        [
            'vA<A>^A', // vA + <A + >^A
            'vA<A^>A'  // vA + <A + ^>A
        ] */
        let options: string[] = [];
        let temp: string[];
        for (let paths of segments) {
            if (options.length === 0) options = [...paths];
            else {
                temp = [];
                for (let option of options) {
                    for (let path of paths) {
                        temp.push(option + path);
                    }
                }
                options = [...temp];
            }
        }

        return options;
    }

    /**
     * Settle on one best option for moving from each key to any other key.
     * @param dpad 
     */
    settle(dpad = this) {
        for (let [key, paths] of this.paths.entries()) {
            if (paths.length === 1) continue;
            else { // Pick the path that eventually results in the shorter option
                const pathLens = paths.map(e => e.length);
                const subPaths = paths.map(e => [e]);
                while (pathLens.every(len => len === pathLens[0])) { // All options have the same length
                    for (let [i, subPath] of subPaths.entries()) {
                        const temp: string[] = [];
                        for (let path of subPath) {
                            const options = this.options(path, dpad);
                            temp.push(...options);
                        }
                        pathLens[i] = Math.min(...temp.map(e => e.length)); // Min length at this level
                        subPaths[i] = temp.filter(v => v.length === pathLens[i]);
                    }
                }
                const shortestPath = paths[pathLens.findIndex(len => len === Math.min(...pathLens))];
                this.paths.set(key, [shortestPath]); // Settle on the one best path
            }
        }
        return this;
    }

    xy(key: string) {
        return [this.keys.indexOf(key) % 3, Math.floor(this.keys.indexOf(key) / 3)] as [number, number];
    }
}

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;

    const dpad = new KeyPad(' ^A<v>').settle();
    const numpad = new KeyPad('789456123 0A').settle(dpad);

    // Get the first d-pad directions
    let at = 'A'; // Numpad bot starts at "A"
    for (let code of inputs) { // 341A
        let path = '';
        for (let key of code) {
            path += numpad.paths.get(at + key)![0];
            at = key;
        }

        // Turn those directions into pairs
        let pairs: Map<string, number> = new Map();
        for (let key of path) {
            pairs.set(at + key, (pairs.get(at + key) ?? 0) + 1);
            at = key;
        }

        // Now go through the next d-pads (including mine)
        for (let bot = 0; bot < (part === 1 ? 2 : 25); bot++) {
            const temp: Map<string, number> = new Map();
            for (let [key, count] of pairs.entries()) {
                const [path] = dpad.paths.get(key)!;
                let at = 'A';
                for (let key of path) {
                    temp.set(at + key, (temp.get(at + key) ?? 0) + count);
                    at = key;
                }
            }
            pairs = temp;
        }
        answer += parseInt(code.substring(0, 3)) * [...pairs.values()].reduce((pv, cv) => pv + cv, 0);
    }
    return answer;
}

run(__filename, solve);