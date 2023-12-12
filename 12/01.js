/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const gcd = (a, b) => {
    if (b == 0) return a;
    return gcd(b, a % b);
};

const len = (x) => x.length;

let DP = {};

/**
 * @param {string} dots first part of input (.?#)
 * @param {Array<number>} groups second part of input (1, 2, 1)
 * @param {number} di current position in dots
 * @param {number} gi current position in groups
 * @param {number} current length of current block of #
 */
const f = (dots, blocks, i, bi, current) => {
    let key = `${i},${bi},${current}`;
    if (DP[key] !== undefined) return DP[key];
    if (i == len(dots)) {
        if (bi == len(blocks) && current == 0) {
            return 1;
        } else if (bi == len(blocks) - 1 && blocks[bi] == current) {
            return 1;
        } else {
            return 0;
        }
    }
    let ans = 0;
    for (let c of [".", "#"]) {
        if (dots[i] == c || dots[i] == "?") {
            if (c == "." && current == 0) ans += f(dots, blocks, i + 1, bi, 0);
            else if (
                c == "." &&
                current > 0 &&
                bi < len(blocks) &&
                blocks[bi] == current
            )
                ans += f(dots, blocks, i + 1, bi + 1, 0);
            else if (c == "#") ans += f(dots, blocks, i + 1, bi, current + 1);
        }
    }
    DP[key] = ans;
    return ans;
};

const input = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split(" "))
    .map((line) => [
        line[0]
            .replace(/\.\.\./g, ".")
            .replace(/^\.*/g, "")
            .replace(/\.*$/g, ""),
        line[1].split(",").map((x) => parseInt(x)),
    ])
    .reduce((sum, line) => {
        DP = {};
        let res = f(line[0], line[1], 0, 0, 0);
        // console.log(line[0], line[1], res, Object.keys(DP).length);
        return sum + res;
    }, 0);

// console.log(f(input[input.length - 1][0], input[input.length - 1][1], 0, 0, 0));

console.log(input);
