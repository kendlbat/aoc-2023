#!/usr/bin/env python3
with open("input", "r") as f:
    input: list[str] = f.read().splitlines()[0].split(",")

boxes: list[list[tuple[str,int]]] = [[] for i in range(256)]

def hashString(string: str) -> int:
    res = 0

    for c in string:
        res += ord(c)
        res *= 17
        res %= 256
    
    return res

def removeChars(chars) -> None:
    global boxes

    boxid = hashString(chars)

    boxes[boxid] = [s for s in boxes[boxid] if s[0] != chars]

def setChars(chars: str, val: int) -> None:
    global boxes

    boxid = hashString(chars)

    for si, slot in enumerate(boxes[boxid]):
        if slot[0] == chars:
            boxes[boxid][si] = (chars, val)
            return
        
    boxes[boxid].append((chars, val))


def computeInstruction(string: str) -> None:
    global boxes

    if string.find("=") != -1:
        setChars(string.split("=")[0], int(string.split("=")[1]))

    else:
        removeChars(string.split("-")[0])

def getResult(boxes: list[list[tuple[str, int]]]) -> int:
    return sum([sum([
            (bi + 1) * (si + 1) * slot[1]
            for si, slot in enumerate(box)
            ]) for bi, box in enumerate(boxes)])

[computeInstruction(s) for s in input]

print(getResult(boxes))