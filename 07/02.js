console.log(require("fs").readFileSync('input')
    .toString()
    .split('\n')
    .map(line => line.split(" "))
    .map(line => [
        line[0]
            .split("")
            .map(v => ({ "A": "E", "K": "D", "Q": "C", "J": "1", "T": "A" })[v] || v),
        parseInt(line[1])
    ])
    .map(line => [...line, line[0].reduce((counts, v) => {
        if (counts[v] == undefined) counts[v] = 1;
        else counts[v]++;
        return counts;
    }, {})])
    .map(line => {
        const wild = line[2]["1"] || 0;
        delete line[2]["1"];
        return [
            line[0].join(""),
            line[1],
            wild,
            Object.values(line[2])
                .sort((a, b) => b - a)
        ];
    })
    .map(line => {
        let [first, ...rest] = line[3];
        if (line[2] == 5) return [line[0], line[1], "5"];
        return [line[0], line[1], [first + line[2], ...rest].join("")];
    })
    .map(line => [({
        "5": "Z",
        "41": "Y",
        "32": "X",
        "311": "W",
        "221": "V",
        "2111": "U",
        "11111": "T"
    })[line[2]] + line[0], line[1]])
    .sort((a, b) => a[0].localeCompare(b[0]))
    .reduce((score, line, idx) => score + line[1] * (idx + 1), 0));