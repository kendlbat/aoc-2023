#!/usr/bin/env python3

with open("input", "r") as f:
    input: list[str] = f.read().split(",")[:-1]

def hashString(string: str) -> int:
    print(string)
    res = 0

    for c in string:
        res += ord(c)
        res *= 17
        res %= 256
    
    return res

print(sum([hashString(s) for s in input]))