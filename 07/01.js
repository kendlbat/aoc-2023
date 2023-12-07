const valueMap = {
    "T": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
};

function mapToCombinationValues(counts) {
    // Five of a kind
    if (Object.keys(counts).length == 1)
        return 6;

    if (Object.keys(counts).length == 2) {
        let values = Object.values(counts);

        // Four of a kind
        if (values.includes(4))
            return 5;

        // Full house
        if (values.includes(3))
            return 4;
    }

    if (Object.keys(counts).length == 3) {
        let values = Object.values(counts);

        // Three of a kind
        if (values.includes(3))
            return 3;

        // Two pair
        if (values.includes(2))
            return 2;
    }

    // One pair
    if (Object.keys(counts).length == 4)
        return 1;

    // High card
    return 0;
}

function calculateScore(line) {
    // Two digits per card, plus their rank
    return line[3] * 10000000000
        + line[0][0] * 100000000
        + line[0][1] * 1000000
        + line[0][2] * 10000
        + line[0][3] * 100
        + line[0][4];
}

const input = require("fs").readFileSync('input')
    .toString()
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => line.split(" "))
    .map(line => [
        line[0]
            .split("")
            .map(v => valueMap[v] || parseInt(v)),
        parseInt(line[1])
    ])
    .map(line => [...line, line[0].reduce((counts, v) => {
        if (counts[v] == undefined) counts[v] = 1;
        else counts[v]++;
        return counts;
    }, {})])
    .map(line => [...line, mapToCombinationValues(line[2])])
    .map(line => [calculateScore(line), line[1]])
    .sort((a, b) => a[0] - b[0])
    .reduce((score, line, idx) => score + line[1] * (idx + 1), 0);



console.log(input);
