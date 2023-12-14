/**
 * @param {Array<string>} matrix
 * @returns {Array<string>}
 * */
function rotateMatrix(matrix) {
    let newMatrix = [];
    for (let i = 0; i < matrix[0].length; i++) {
        newMatrix.push([]);
        for (let j = 0; j < matrix.length; j++) {
            newMatrix[i].push(matrix[j][i]);
        }
    }
    return newMatrix;
}

/**
 *
 * @param {Array<string>} lines
 * @returns {Array<number>}
 */
function getMirrorRow(lines) {
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const len = Math.min(i, lines.length - i);
        const left = lines.slice(i - len, i);
        const right = lines.slice(i, i + len);
        if (left.toReversed().join("|") === right.join("|")) {
            result.push(i);
        }
    }
    return result;
}

const patterns = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n\n")
    .filter((x) => x.length > 0);

let sum = 0;

for (let pattern of patterns) {
    let rows = pattern.split("\n");

    let mrow = getMirrorRow(rows);
    if (mrow.length !== 0) {
        sum += 100 * mrow[0];
    } else {
        let rotatedRows = rotateMatrix(rows).map((r) => r.join(""));
        // console.log(rotatedRows.join("\n"));
        let mcol = getMirrorRow(rotatedRows)[0];
        if (mcol !== null) {
            sum += mcol;
        }
    }
}

console.log(sum);
