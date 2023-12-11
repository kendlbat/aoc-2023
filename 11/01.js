const input = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line, idx) => line.split(""));

// console.log(input);

const width = input[0].length;
const height = input.length;

let galaxies = input
    .map((line, idx) =>
        line.map((x, idy) => [x, idx, idy]).filter((x) => x[0] == "#"),
    )
    .flat();

let expandCols = [];
let expandRows = [];

for (let i = 0; i < width; i++)
    if (!galaxies.find((x) => x[1] == i)) expandRows.push(i);
for (let j = 0; j < height; j++)
    if (!galaxies.find((x) => x[2] == j)) expandCols.push(j);

// console.log(expandCols);
// console.log(expandRows);

let expandedGalaxies = [];

for (let galaxy of galaxies) {
    expandedGalaxies.push([
        galaxy[0],
        galaxy[1] + expandRows.filter((n) => n < galaxy[1]).length,
        galaxy[2] + expandCols.filter((n) => n < galaxy[2]).length,
    ]);
}

galaxies = expandedGalaxies;

let sum = 0;

for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        let first = galaxies[i];
        let second = galaxies[j];

        let distance =
            Math.abs(first[1] - second[1]) + Math.abs(first[2] - second[2]);

        // console.log(first, second, distance);

        sum += distance;
    }
}

console.log(sum);
