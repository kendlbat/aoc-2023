console.log(
    require("fs")
        .readFileSync("input")
        .toString()
        .split("\n")
        .filter((line) => line.length > 0)
        .map((line) => String(line).match(/[0-9]/g))
        .map((v) => String(v[0]) + String(v.pop()))
        .map((v) => {
            console.log(String(v));
            return v;
        })
        .map((e) => parseInt(e))
        .reduce((a, b) => a + b),
);
