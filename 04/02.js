function resolveCopies(copies, baseindex = 0) {
    console.log(copies);
    return copies
        .map((c, i) => Array.from(cards).slice(baseindex + i + 1, baseindex + i + c + 1))
        .map((r, i) => resolveCopies(r, baseindex + i + 1));
}

const cards = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => ({
        "winning": line
            .split(":")[1]
            .split("|")[0]
            .trim()
            .split(" ")
            .filter(v => v.length > 0)
            .map(v => parseInt(v)),
        "mine": line
            .split("|")[1]
            .trim()
            .split(" ")
            .filter(v => v.length > 0)
            .map(v => parseInt(v))
    }))
    .map(data => data.winning.reduce((acc, num) => {
        if (data.mine.includes(num)) return acc + 1;
        return acc;
    }, 0));

const json = JSON.stringify(resolveCopies(cards));
const resolved = json.match(/\[/g).length - 1;
console.log(json);
console.log(resolved)
