import { readFileSync } from "node:fs";
import path from "path";

const readFile = (filename: string) =>
  readFileSync(path.resolve(__dirname, filename))
    .toString()
    .trim()
    .split("\n")
    .map((x) => parseInt(x, 10));

const part1 = (input: number[]): number =>
  input.reduce((prev, curr) => (curr > prev ? curr : prev), 0);

const part2 = (input: number[], elf1 = 0, elf2 = 0, elf3 = 0): number => {
  for (const currentElf of input) {
    if (currentElf > elf1) {
      elf3 = elf2;
      elf2 = elf1;
      elf1 = currentElf;
    } else if (currentElf > elf2) {
      elf3 = elf2;
      elf2 = currentElf;
    } else if (currentElf > elf3) {
      elf3 = currentElf;
    }
  }
  return elf1 + elf2 + elf3;
};

const part = process.env.part || "part1";
const result = (part === "part1" ? part1 : part2)(readFile("../input.txt"));
console.log(result);
