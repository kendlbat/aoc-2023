#!/usr/bin/env node
const fs = require("node:fs");
const cp = require("child_process");
const aoc = require("./aoc");

async function main() {
    const dirs = fs
        .readdirSync(".", { withFileTypes: true })
        .filter((x) => x.isDirectory())
        .map((x) => x.name)
        .filter((name) => name.match(/^(0[1-9]|1[0-9]|2[0-5])$/));

    const times = await Promise.all(
        dirs.map(async (dir) => {
            if (!fs.existsSync(`${dir}/input`)) {
                const input = await aoc.getInput(dir);
                fs.writeFileSync(`${dir}/input`, input);
                console.log(`Fetched input for ${dir}`);
            }

            const start1 = Date.now();
            cp.execSync(`cd ${dir} && node 01.js`);
            const end1 = Date.now();
            cp.execSync(`cd ${dir} && node 02.js`);
            const end2 = Date.now();

            return [end1 - start1, end2 - end1];
        }),
    );

    times.forEach((time, idx) => {
        console.log(`Day ${dirs[idx]}: ${time[0]}ms, ${time[1]}ms`);
    });

    const total = times.reduce((acc, cur) => acc + cur[0] + cur[1], 0);

    console.log(`Total: ${total}ms`);
}

main();
