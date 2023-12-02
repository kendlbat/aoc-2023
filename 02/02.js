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
            ...game, "min": {
                "red": Math.max(...game.rounds.map(round => round.red)),
                "green": Math.max(...game.rounds.map(round => round.green)),
                "blue": Math.max(...game.rounds.map(round => round.blue)),
            }
        }))
        .map(game => game.min)
        .reduce((a, b) => a + (b.red * b.green * b.blue), 0)
);