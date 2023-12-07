/**
 * 
 * @param {number} seed 
 * @param {number[]} map 
 * Map a seed to a destination (returns the seed if it is not in the map)
 */
function sourceToDest(seed, map) {
    console.log(seed, map);
    if (seed >= map[1] && seed < map[1] + map[2])
        return map[0] + (seed - map[1]);

    return -1;
}

const input = require("fs").readFileSync('input')
    .toString()
    .split('\n\n');

const seeds = input[0]
    .split(": ")[1]
    .split(' ')
    .map(v => parseInt(v));

const maps = input
    .slice(1)
    .map(line => line
        .split("\n")
        .slice(1))
    .map(line => line
        .map(smap => smap
            .split(" ")
            .map(v => parseInt(v))));

const resolved = maps.reduce((acc, mapcat) => acc.map((seed) => {
    for (let map of mapcat) {
        let dest = sourceToDest(seed, map);
        console.log(dest);
        if (dest != -1) {
            return dest;
        }
    }
    return seed;
}), seeds);

// console.log(seeds);
// console.log(maps);
console.log(Math.min(...resolved));