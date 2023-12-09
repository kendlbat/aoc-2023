/**
 * Returns an array with the differences between each adjacent number in the input array.
 * @param {Array<number>} numbers
 * @returns {Array<number>}
 */
function getDifferenceMap(numbers) {
    return numbers.map((x, i) => x - (numbers[i - 1] || 0)).slice(1);
}

/**
 *
 * @param {Array<number>} numbers
 * @returns {number}
 */
function predictPrevValue(numbers) {
    if (numbers.every((_) => !_)) return 0;
    return numbers[0] - predictPrevValue(getDifferenceMap(numbers));
}

const input = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split(" ").map((x) => parseInt(x)))
    .map((l) => predictPrevValue(l))
    .reduce((acc, x) => acc + x, 0);

console.log(input);
