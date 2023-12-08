function calculateDistanceTravelled(buttonHoldTime, duration) {
    // Every ms of button hold time increases the speed for the rest of the time by one, but takes 1ms
    if (buttonHoldTime > duration) return 0;

    // 1, 7 => 6
    // 2, 7 => 10
    // 3, 7 => 12
    // 4, 7 => 12
    // 5, 7 => 10
    // 6, 7 => 6

    return (duration - buttonHoldTime) * buttonHoldTime;
}

const input = require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) =>
        line
            .split(":")[1]
            .split(" ")
            .filter((v) => v != "")
            .map((v) => parseInt(v)),
    );

const times = input[0];
const distances = input[1];

let values = [];

for (let i = 0; i < times.length; i++) {
    let time = times[i];
    let distance = distances[i];
    let speed = distance / time;
    let ctr = 0;

    let minwin = 0;

    for (let j = 1; j < time - 1; j++) {
        if (calculateDistanceTravelled(j, time) > distance) {
            minwin = j;
            break;
        }
    }

    for (let j = minwin; j < time - 1; j++) {
        let buttonHoldTime = j;
        let distanceTravelled = calculateDistanceTravelled(
            buttonHoldTime,
            time,
        );
        if (distanceTravelled <= distance) break;
        ctr++;
    }

    values.push(ctr);
}

let initial = values.shift();
console.log(values.reduce((a, b) => a * b, initial));
