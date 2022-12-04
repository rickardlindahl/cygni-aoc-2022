import { readFileSync } from "node:fs";
import path from "path";

type SectionRange = [number, number];
type Section = [SectionRange, SectionRange];

const readFile = (filename: string): Section[] =>
  readFileSync(path.resolve(__dirname, filename))
    .toString()
    .trim()
    .split("\n")
    .map((row) => {
      const [left, right] = row.split(",");
      const [leftStart, leftEnd] = left.split("-");
      const [rightStart, rightEnd] = right.split("-");
      return [
        [parseInt(leftStart, 10), parseInt(leftEnd, 10)],
        [parseInt(rightStart, 10), parseInt(rightEnd, 10)],
      ];
    });

const fullyContainsSection = (section: Section): boolean => {
  const [[leftStart, leftEnd], [rightStart, rightEnd]] = section;

  return (
    (leftStart <= rightStart && leftEnd >= rightEnd) ||
    (rightStart <= leftStart && rightEnd >= leftEnd)
  );
};

const part1 = (input: Section[]): number =>
  input.reduce<number>(
    (result, section) => result + (fullyContainsSection(section) ? 1 : 0),
    0
  );

const containsSection = (section: Section): boolean => {
  const [[leftStart, leftEnd], [rightStart, rightEnd]] = section;

  return rightStart > leftStart
    ? rightStart - leftEnd <= 0
    : leftStart - rightEnd <= 0;
};

const part2 = (input: Section[]): number =>
  input.reduce<number>(
    (result, section) => result + (containsSection(section) ? 1 : 0),
    0
  );

const part = process.env.part || "part1";
const result = (part === "part1" ? part1 : part2)(readFile("../input.txt"));
console.log(result);
