const input = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0);

let [instructions, ...nodes] = input;

nodes = nodes
    .map((line) => line.match(/[A-Z]{3}/g))
    .reduce((acc, line) => ({ ...acc, [line[0]]: [line[1], line[2]] }), {});

let counter = 0;
let current = "AAA";

while (current !== "ZZZ") {
    instructions.split("").forEach((inst) => {
        if (current == "ZZZ") return;
        if (inst == "L") {
            current = nodes[current][0];
        } else if (inst == "R") {
            current = nodes[current][1];
        }
        counter++;
    });
}

console.log(counter);
