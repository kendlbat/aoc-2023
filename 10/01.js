const map = {
    VERT: "|",
    HORIZ: "-",
    UPRIGHT: "L",
    DOWNRIGHT: "F",
    DOWNLEFT: "7",
    UPLEFT: "J",
    START: "S",
    GROUND: ".",
};

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

/**
 *
 * @param {Array<number>} position
 * @returns {Array<Array<number>>}
 */
function findConnections(position) {
    // There are always exactly two connections
    const connections = [];
    const [i, j] = position;
    const val = input[i][j];

    // Check above for connection
    if (
        [map.VERT, map.UPLEFT, map.UPRIGHT, map.START].includes(val) &&
        i > 0 &&
        [map.VERT, map.DOWNLEFT, map.DOWNRIGHT].includes(input[i - 1][j])
    )
        connections.push([i - 1, j]);

    // Check below for connection
    if (
        [map.VERT, map.DOWNLEFT, map.DOWNRIGHT, map.START].includes(val) &&
        i < input.length - 1 &&
        [map.VERT, map.UPLEFT, map.UPRIGHT].includes(input[i + 1][j])
    )
        connections.push([i + 1, j]);

    // Check left for connection
    if (
        [map.HORIZ, map.UPLEFT, map.DOWNLEFT, map.START].includes(val) &&
        j > 0 &&
        [map.HORIZ, map.DOWNRIGHT, map.UPRIGHT].includes(input[i][j - 1])
    )
        connections.push([i, j - 1]);

    // Check right for connection
    if (
        [map.HORIZ, map.UPRIGHT, map.DOWNRIGHT, map.START].includes(val) &&
        j < input[i].length - 1 &&
        [map.HORIZ, map.DOWNLEFT, map.UPLEFT].includes(input[i][j + 1])
    )
        connections.push([i, j + 1]);

    return connections;
}

const input = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split(""));

let start = [0, 0];
for (let i = 0; i < input.length; i++) {
    const j = input[i].indexOf(map.START);
    if (j !== -1) {
        start = [i, j];
        break;
    }
}

let steps = 1;

let positions = [...findConnections(start).map((x) => [start, x])];
let newPositions = [];
while (true) {
    newPositions = [];
    for (const pos of positions) {
        const prev = pos[0];
        const curr = pos[1];

        const connections = findConnections(curr);

        for (const connection of connections) {
            if (arraysEqual(connection, prev)) continue;
            newPositions.push([curr, connection]);
        }
    }
    steps++;
    if (newPositions.length === 0) break;
    positions = newPositions;
    // If both positions are the same, we have found the loop
    if (arraysEqual(positions[0][1], positions[1][1])) break;

    // If the previous position of a is the same as the current position of b, we have found the loop
    if (
        arraysEqual(positions[0][0], positions[1][1]) ||
        arraysEqual(positions[1][0], positions[0][1])
    )
        break;
}

console.log(steps);
