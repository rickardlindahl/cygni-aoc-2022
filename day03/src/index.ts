import { readFileSync } from "node:fs";
import path from "path";

const getScore = (char: string): number =>
  char === char.toUpperCase()
    ? char.charCodeAt(0) - 38
    : char.charCodeAt(0) - 96;

const readFile = (filename: string): string[] =>
  readFileSync(path.resolve(__dirname, filename)).toString().trim().split("\n");

const intersect = (a: string[], b: string[]): string[] =>
  a.filter(Set.prototype.has, new Set(b));

const part1 = (input: string[]): number =>
  input
    .map<[string, string]>((row) => [
      row.slice(0, row.length / 2),
      row.slice(row.length / 2),
    ])
    .reduce(
      (result, [left, right]) =>
        result + getScore(intersect(left.split(""), right.split(""))[0]),
      0
    );

const part2 = (input: string[]): number => {
  let score = 0;
  for (let i = 0; i < input.length; ) {
    const first = input[i];
    const second = input[i + 1];
    const third = input[i + 2];

    const firstGroup = intersect(first.split(""), second.split(""));
    const secondGroup = intersect(firstGroup, third.split(""));
    score += getScore(secondGroup[0]);
    i += 3;
  }
  return score;
};

const part = process.env.part || "part1";
const result = (part === "part1" ? part1 : part2)(readFile("../input.txt"));
console.log(result);
