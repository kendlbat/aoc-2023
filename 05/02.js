const input = require("fs").readFileSync('input')
    .toString()
    .split('\n\n');

const preseeds = input[0]
    .split(": ")[1]
    .split(' ')
    .map(v => parseInt(v));

const seeds = [];

for (let i = 0; i < preseeds.length; i += 2) {
    seeds.push(preseeds.slice(i, i + 2))
}

const maps = input
    .slice(1)
    .map(line => line
        .split("\n")
        .slice(1))
    .map(line => line
        .map(smap => smap
            .split(" ")
            .map(v => parseInt(v)))
        .sort((a, b) => a[1] - b[1]));

let mappingseeds = [...seeds];

for (let mapstage of maps) {
    let mappedseeds = [];
    for (let seedkey of mappingseeds) {
        let range = [seedkey[0], seedkey[0] + seedkey[1]];
        let currentIdx = range[0];

        let mapped = [];
        for (let map of mapstage) {
            let maprange = [map[1], map[1] + map[2]];
            if (maprange[1] < range[0]) continue;
            if (maprange[0] > range[1]) continue;

            if (maprange[0] > currentIdx) {
                mapped.push([currentIdx, maprange[0] - currentIdx]);
                currentIdx = maprange[0];
            }

            let mapEndIdx = Math.min(maprange[1], range[1]);
            let mappedCount = mapEndIdx - currentIdx;
            let mappedRange = [currentIdx + (map[0] - map[1]), mappedCount];
            if (mappedCount < 0) throw new Error("mappedCount < 0");
            mapped.push(mappedRange);
            currentIdx = mapEndIdx;
        }

        if (currentIdx < range[1])
            mapped.push([currentIdx, range[1] - currentIdx]);

        mappedseeds = mappedseeds.concat(
            mapped.filter(v => v[1] > 0)
        );
    }
    mappingseeds = mappedseeds;
}


// console.log(seeds);
// console.log(maps);
console.log(mappingseeds.map(v => v[0]).reduce((a, b) => a < b ? a : b, Math.INFINITY));