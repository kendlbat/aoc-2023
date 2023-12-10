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
        [map.VERT, map.DOWNLEFT, map.DOWNRIGHT, map.START].includes(
            input[i - 1][j],
        )
    )
        connections.push([i - 1, j]);

    // Check below for connection
    if (
        [map.VERT, map.DOWNLEFT, map.DOWNRIGHT, map.START].includes(val) &&
        i < input.length - 1 &&
        [map.VERT, map.UPLEFT, map.UPRIGHT, map.START].includes(input[i + 1][j])
    )
        connections.push([i + 1, j]);

    // Check left for connection
    if (
        [map.HORIZ, map.UPLEFT, map.DOWNLEFT, map.START].includes(val) &&
        j > 0 &&
        [map.HORIZ, map.DOWNRIGHT, map.UPRIGHT, map.START].includes(
            input[i][j - 1],
        )
    )
        connections.push([i, j - 1]);

    // Check right for connection
    if (
        [map.HORIZ, map.UPRIGHT, map.DOWNRIGHT, map.START].includes(val) &&
        j < input[i].length - 1 &&
        [map.HORIZ, map.DOWNLEFT, map.UPLEFT, map.START].includes(
            input[i][j + 1],
        )
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

let startconn = findConnections(start).map((x) => [start, x]);
let startsymbol = "";

// Check if the start is F
// get the directions the connections are in
let firstdir = "";
if (startconn[0][1][0] === start[0]) {
    if (startconn[0][1][1] > start[1]) firstdir = "right";
    else firstdir = "left";
} else {
    if (startconn[0][1][0] > start[0]) firstdir = "down";
    else firstdir = "up";
}

let seconddir = "";
if (startconn[1][1][0] === start[0]) {
    if (startconn[1][1][1] > start[1]) seconddir = "right";
    else seconddir = "left";
} else {
    if (startconn[1][1][0] > start[0]) seconddir = "down";
    else seconddir = "up";
}

if (firstdir === "right" && seconddir === "down") startsymbol = "F";
else if (seconddir === "right" && firstdir === "down") startsymbol = "F";
else if (firstdir === "left" && seconddir === "down") startsymbol = "7";
else if (seconddir === "left" && firstdir === "down") startsymbol = "7";
else if (firstdir === "right" && seconddir === "up") startsymbol = "L";
else if (seconddir === "right" && firstdir === "up") startsymbol = "L";
else if (firstdir === "left" && seconddir === "up") startsymbol = "J";
else if (seconddir === "left" && firstdir === "up") startsymbol = "J";

input[start[0]][start[1]] = startsymbol;

let pos = startconn[0];
let newPosition = [];
let loopElements = [start, pos[1]];

while (true) {
    newPosition = [];
    const prev = pos[0];
    const curr = pos[1];

    const connections = findConnections(curr);

    for (const connection of connections) {
        if (arraysEqual(connection, prev)) continue;
        pos = [curr, connection];
    }
    steps++;
    if (arraysEqual(pos[1], start)) break;
    loopElements.push(pos[1]);
    // If both positions are the same, we have found the loop
}

// Convert any tubes not in the loop to ground
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (
            !loopElements.some((x) => arraysEqual(x, [i, j])) &&
            input[i][j] !== map.START
        )
            input[i][j] = map.GROUND;
    }
}

// Convert the start to the correct symbol

// Convert all tubes to | or -
for (let i = 0; i < input.length; i++) {
    input[i] = input[i]
        .join("")
        .replace(/(F7|LJ)/g, "")
        .replace(/(F(-+)7|L(-+)J)/g, "")
        .replace(/(F(-*)J|L(-*)7)/g, "|")
        .split("");
}

// console.log(input.map((x) => x.join("")).join("\n"));

let enclosed = 0;
let inPipe = false;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === "|") inPipe = !inPipe;
        if (inPipe && input[i][j] === ".") enclosed++;
    }
}

console.log(enclosed);
