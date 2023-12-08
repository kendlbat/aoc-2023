const input = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0);

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

let [instructions, ...nodes] = input;

nodes = nodes
    .map((line) => line.match(/[0-9A-Z]{3}/g))
    .reduce((acc, line) => ({ ...acc, [line[0]]: [line[1], line[2]] }), {});

console.log(
    Object.values(
        Object.keys(nodes)
            .filter((k) => k.endsWith("A"))
            .reduce((acc, initial) => {
                let counter = 0;
                let node = initial;
                while (true) {
                    for (let inst of instructions.split("")) {
                        if (inst == "L") {
                            node = nodes[node][0];
                        } else if (inst == "R") {
                            node = nodes[node][1];
                        }
                        counter++;
                        if (node.charAt(2) == "Z")
                            return { ...acc, [initial]: counter };
                    }
                }
            }, {}),
    ).reduce((a, b) => {
        return (a * b) / gcd(a, b);
    }, 1),
);
