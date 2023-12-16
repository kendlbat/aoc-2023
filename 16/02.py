from common import getEnergisedCount, getInput, Direction

width = len(getInput()[0])
height = len(getInput())

# Left starters
ec = max([getEnergisedCount(0, y, Direction.RIGHT) for y in range(height)])

# Top starters
ec = max([ec, max([getEnergisedCount(x, 0, Direction.DOWN) for x in range(width)])])

# Right starters
ec = max([ec, max([getEnergisedCount(width - 1, y, Direction.LEFT) for y in range(height)])])

# Bottom starters
ec: int = max([ec, max([getEnergisedCount(x, height - 1, Direction.UP) for x in range(width)])])


print(ec)