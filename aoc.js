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
    if (!AOC_SESSION) throw new Error("No AOC session key!");

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

async function main() {
    // Get CLI parameters
    const args = process.argv.slice(2);

    if (args.length == 1) {
        const day = args[0];

        if (!day.match(/^(0?[1-9]|1[0-9]|2[0-5])$/))
            throw new Error("Invalid value for parameter day");

        const intday = parseInt(day);
        const paddedday = day.toString().padStart(2, "0");

        // If directory does not exist, create
        if (!fs.existsSync(`./${paddedday}`)) {
            fs.mkdirSync(`./${paddedday}`);
        }

        if (!fs.existsSync(`./${paddedday}/input`)) {
            try {
                const input = await getInput(intday);
                fs.writeFileSync(`./${paddedday}/input`, input);
            } catch (e) {
                throw new Error("Could not get input");
            }
        }
    } else {
        console.warn("Please provide a value for required parameter 'day'");
    }
}

if (!module.parent) {
    main();
}

module.exports = {
    getInput,
};
