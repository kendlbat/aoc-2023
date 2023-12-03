/**
 * 
 * @param {string} str 
 * @param {RegExp} re 
 * @returns {any[][]}
 */
function getAllMatchPositionsStartEnd(str, re) {
    let match;
    let result = [];
    while ((match = re.exec(str)) != null) {
        result.push([match[0], match.index, match.index + match[0].length]);
    }
    return result;
}

const input = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter(line => line.length > 0)
    .reduce((acc, c, i) => {
        // Find positions of all symbols
        return {
            "symbols": {
                ...acc.symbols, [i]: getAllMatchPositionsStartEnd(c, /[^0-9\.]/g)
            },
            "numbers": {
                ...acc.numbers, [i]: getAllMatchPositionsStartEnd(c, /[0-9]+/g)
            }
        }
    }, { "symbols": {}, "numbers": {} });

// console.log(JSON.stringify(input, null, 2));

let gearRatios = 0;

// Merge all arrays from object.values symbols
const syms = Object.keys(input.symbols)
    .reduce((acc, key) => {
        if (input.symbols[key].length > 0) return acc.concat([...(input.symbols[key].map(v => [parseInt(key), ...v]))])
        return acc;
    }, [])
    .forEach(sym => {
        // console.log(sym);
        let adjacents = {};
        for (let i = sym[0] != 0 ? sym[0] - 1 : 0; i <= Math.min(Object.keys(input.numbers)[Object.keys(input.numbers).length - 1], sym[0] + 1); i++) {
            if (input.numbers[i].length > 0) {
                // Is a qualified line
                input.numbers[i].forEach((num, j) => {
                    // console.log(num, sym);
                    if (num[1] - 1 == sym[2] || num[2] + 1 == sym[1] || num[1] == sym[2] || num[2] == sym[1] || (num[1] - 1 < sym[2] && num[2] + 1 > sym[2])) {
                        if (!(adjacents[`${i}_${j}`])) adjacents[`${i}_${j}`] = num[0];
                    }
                });
            }
        }
        adjacents = Object.values(adjacents);
        if (adjacents.length == 2)
            gearRatios += adjacents[0] * adjacents[1];
    });

console.log(gearRatios);