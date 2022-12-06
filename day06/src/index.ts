import { readFileSync } from "node:fs";
import path from "path";

const rf = (filename: string): string =>
  readFileSync(path.resolve(__dirname, filename)).toString().trim();

const checkIndex = (input: string, i: number, ptrn: number): boolean =>
  [...new Set(input.slice(i - ptrn, i))].length === ptrn;

const work = (input: string, uniqueCharacters: number): number => {
  let i = uniqueCharacters;
  while (i < input.length) {
    if (checkIndex(input, i, uniqueCharacters)) {
      break;
    }
    i++;
  }
  return i;
};

const part1 = (input: string): number => work(input, 4);
const part2 = (input: string): number => work(input, 14);

console.log((process.env.part === "part2" ? part2 : part1)(rf("../input.txt")));
