console.log(
    require("fs")
        .readFileSync("input")
        .toString()
        .split("\n")
        .filter(line => line.length > 0)
        .map(line => (
            {
                "gid": parseInt(line.match(/Game ([0-9]+)/)[1]),
                "rounds": line
                    .split(":")[1]
                    .split(";")
                    .map(game => (
                        {
                            "red": game.includes("red") ? parseInt(game.match(/([0-9]+) red/)[1]) : 0,
                            "green": game.includes("green") ? parseInt(game.match(/([0-9]+) green/)[1]) : 0,
                            "blue": game.includes("blue") ? parseInt(game.match(/([0-9]+) blue/)[1]) : 0,
                        }
                    ))
            }
        ))
        .map(game => ({
            ...game, "possible": !game.rounds.find(round => (
                round.red > 12 ||
                round.green > 13 ||
                round.blue > 14
            ))
        }))
        .reduce((a, b) => a + (b.possible ? b.gid : 0), 0)
);