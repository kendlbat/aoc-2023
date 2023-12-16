#!/usr/bin/env python3
from common import getEnergisedCount, getInput, Direction

width = len(getInput()[0])
height = len(getInput())

print(max([
    max([getEnergisedCount(0, y, Direction.RIGHT) for y in range(height)]),
    max([getEnergisedCount(x, 0, Direction.DOWN) for x in range(width)]),
    max([getEnergisedCount(width - 1, y, Direction.LEFT) for y in range(height)]),
    max([getEnergisedCount(x, height - 1, Direction.UP) for x in range(width)])
]))
