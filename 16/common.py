from enum import StrEnum
import re

class Direction(StrEnum):
    UP = "^"
    RIGHT = ">"
    DOWN = "v"
    LEFT = "<"

class Tile(StrEnum):
    EMPTY = "."
    SLASH = "/"
    BACKSLASH = "\\"
    HSPLIT = "-"
    VSPLIT = "|"

VERTICAL = [Direction.UP, Direction.DOWN]
HORIZONTAL = [Direction.LEFT, Direction.RIGHT]

input: list[list[Tile]] = []

def getVisitedString(visited: list[list[list[Direction]]]) -> str:
    return "\n".join(["".join(["." if len(s) == 0 else (str(s[0]) if len(s) == 1 else str(len(s))) for s in l]) for l in visited])

def getEnergisedString(visited: list[list[list[Direction]]]) -> str:
    return re.sub(r"[^.\n]", "#", getVisitedString(visited))

with open("input", "r") as f:
    input = [[Tile(t) for t in list(i)] for i in f.read().splitlines() if len(i) > 0]

def gt(x: int, y: int) -> tuple[int, int, Tile]:
    global input
    return (x, y, input[y][x])

def getInput() -> list[list[Tile]]:
    global input
    return input

def getEnergisedCount(startx: int, starty: int, startdir: Direction) -> int:
    beams: list[tuple[int, int, Direction]] = []
    visited: list[list[list[Direction]]] = [[[] for i in range(len(s))] for s in input]

    match startdir:
        case Direction.UP:
            beams.append((startx, starty + 1, Direction.UP))
        case Direction.RIGHT:
            beams.append((startx - 1, starty, Direction.RIGHT))
        case Direction.DOWN:
            beams.append((startx, starty - 1, Direction.DOWN))
        case Direction.LEFT:
            beams.append((startx + 1, starty, Direction.LEFT))

    while len(beams) > 0:
        newBeams: list[tuple[int, int, Direction]] = []

        for beam in beams:
            x, y, d = beam

            nextTile: tuple[int, int, Tile] = (0, 0, Tile.EMPTY)

            # Get next tile
            if d == Direction.UP:
                if y - 1 >= 0:
                    nextTile = gt(x, y - 1)
                else: continue
            if d == Direction.RIGHT:
                if x + 1 < len(input[y]):
                    nextTile = gt(x + 1, y)
                else: continue
            if d == Direction.DOWN:
                if y + 1 < len(input):
                    nextTile = gt(x, y + 1)
                else: continue
            if d == Direction.LEFT:
                if x - 1 >= 0:
                    nextTile = gt(x - 1, y)
                else: continue

            # What to do on the next tile
            if nextTile[2] == Tile.EMPTY:
                # If empty, continue as normal
                newBeams.append((nextTile[0], nextTile[1], d))
            elif nextTile[2] == Tile.HSPLIT:
                if d in VERTICAL:
                    newBeams.append((nextTile[0], nextTile[1], Direction.LEFT))
                    newBeams.append((nextTile[0], nextTile[1], Direction.RIGHT))
                else:
                    newBeams.append((nextTile[0], nextTile[1], d))
            elif nextTile[2] == Tile.VSPLIT:
                if d in HORIZONTAL:
                    newBeams.append((nextTile[0], nextTile[1], Direction.UP))
                    newBeams.append((nextTile[0], nextTile[1], Direction.DOWN))
                else:
                    newBeams.append((nextTile[0], nextTile[1], d))
            elif nextTile[2] == Tile.SLASH:
                match d:
                    case Direction.UP:
                        newBeams.append((nextTile[0], nextTile[1], Direction.RIGHT))
                    case Direction.RIGHT:
                        newBeams.append((nextTile[0], nextTile[1], Direction.UP))
                    case Direction.DOWN:
                        newBeams.append((nextTile[0], nextTile[1], Direction.LEFT))
                    case Direction.LEFT:
                        newBeams.append((nextTile[0], nextTile[1], Direction.DOWN))
            elif nextTile[2] == Tile.BACKSLASH:
                match d:
                    case Direction.UP:
                        newBeams.append((nextTile[0], nextTile[1], Direction.LEFT))
                    case Direction.RIGHT:
                        newBeams.append((nextTile[0], nextTile[1], Direction.DOWN))
                    case Direction.DOWN:
                        newBeams.append((nextTile[0], nextTile[1], Direction.RIGHT))
                    case Direction.LEFT:
                        newBeams.append((nextTile[0], nextTile[1], Direction.UP))

        newBeams = [b for b in newBeams if visited[b[1]][b[0]].count(b[2]) == 0]

        for beam in newBeams:
            x, y, d = beam
            visited[y][x].append(d)

        # print(getVisitedString(visited))
        # print()

        beams = []
        beams = newBeams

    es = getEnergisedString(visited)
    # print(es)
    return es.count("#")




