const dotenv = require("dotenv");
const fs = require("node:fs");
dotenv.config();

const AOC_SESSION = process.env.AOC_SESSION;

/**
 *
 * @param {string | number} day
 * @param {string} year
 * @returns {Promise<string>}
 */
async function getInput(day, year = "2023") {
    if (typeof day === "number") day = day.toString().padStart(2, "0");

    if (!(typeof day === "string"))
        throw new Error("Day must be a string, e.g. '01'");

    if (!day.match(/^(0[1-9]|1[0-9]|2[0-5])$/))
        throw new Error("Day must be a number between 01 and 25");

    if (!(typeof year === "string"))
        throw new Error("Year must be a string, e.g. '2023'");

    return await fetch(
        `https://adventofcode.com/${year}/day/${parseInt(day)}/input`,
        {
            headers: {
                cookie: `session=${AOC_SESSION}`,
            },
        },
    ).then((res) => res.text());
}

module.exports = {
    getInput,
};
