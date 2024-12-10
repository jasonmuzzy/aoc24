import { run } from 'aoc-copilot';

//       --------Part 1--------   --------Part 2--------
// Day       Time   Rank  Score       Time   Rank  Score
//   9   13:47:24  38044      0   18:02:48  33528      0

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const nums = inputs[0].split('').map(Number);
    const files: { id: number, offset: number, length: number }[] = [];
    const empties: { offset: number, length: number }[] = [];
    for (let i = 0, offset = 0; i < nums.length; i++) {
        if (i % 2 === 0) files.push({ id: i / 2, offset, length: nums[i] });
        else if (nums[i] > 0) empties.push({ offset, length: nums[i] });
        offset += nums[i];
    }
    if (nums.length % 2 === 1) empties.push({ offset: Infinity, length: 0 }); // Trigger unmovable file
    while (files.length > 0) {
        const file = files.pop()!;
        for (let empty of empties) {
            if (empty.offset > file.offset) { // Can't move earlier
                for (let j = 0; j < file.length; j++) answer += (file.offset + j) * file.id;
                break;
            } else if (empty.length >= (part === 1 ? 1 : file.length)) { // Fits some (part 1) or all (part 2) of file
                let count = 0;
                for (; count < file.length && count < empty.length; count++) answer += (empty.offset + count) * file.id;
                empty.offset += count;
                empty.length -= count;
                file.length -= count;
                if (file.length === 0) break;
            }
        }
    }
    return answer;
}

run(__filename, solve);