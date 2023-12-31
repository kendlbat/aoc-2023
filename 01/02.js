console.log(
    require("fs")
        .readFileSync("input")
        .toString()
        .split("\n")
        .filter((line) => line.length > 0)
        .map((line) => line.replace(/one/g, "one1one"))
        .map((line) => line.replace(/two/g, "two2two"))
        .map((line) => line.replace(/three/g, "three3three"))
        .map((line) => line.replace(/four/g, "four4four"))
        .map((line) => line.replace(/five/g, "five5five"))
        .map((line) => line.replace(/six/g, "six6six"))
        .map((line) => line.replace(/seven/g, "seven7seven"))
        .map((line) => line.replace(/eight/g, "eight8eight"))
        .map((line) => line.replace(/nine/g, "nine9nine"))
        .map((v) => {
            console.log(String(v));
            return v;
        })
        .map((line) => String(line).match(/[0-9]/g))
        .map((v) => String(v[0]) + String(v.pop()))
        .map((e) => parseInt(e))
        .reduce((a, b) => a + b),
);
