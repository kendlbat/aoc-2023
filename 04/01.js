console.log(
    require("fs")
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
        .map(line =>
            line.mine.reduce((points, v) => {
                if (line.winning.includes(v)) {
                    if (points == 0) return 1;
                    return points * 2;
                }
                return points;
            }, 0)
        )
        .reduce((a, b) => a + b, 0)
);