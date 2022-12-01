import { open } from "node:fs/promises";

const part = process.env.part;
if (part !== "part1" && part !== "part2") {
  throw new Error("part must be part1 or part2");
}

const readFile = async (filename: string) => {
  const file = await open(filename);

  const caloriesPerElf: number[] = [];
  let caloriesForCurrentElf = 0;

  for await (const line of file.readLines()) {
    if (line === "") {
      caloriesPerElf.push(caloriesForCurrentElf);
      caloriesForCurrentElf = 0;
    } else {
      caloriesForCurrentElf += parseInt(line, 10);
    }
  }

  if (caloriesForCurrentElf > 0) {
    caloriesPerElf.push(caloriesForCurrentElf);
  }

  return caloriesPerElf;
};

const part1 = (caloriesPerElf: number[]): number => {
  let highest = 0;
  for (const currentElfCalories of caloriesPerElf) {
    if (currentElfCalories > highest) {
      highest = currentElfCalories;
    }
  }
  return highest;
};

const part2 = (caloriesPerElf: number[]): number => {
  let elf1 = Number.NEGATIVE_INFINITY;
  let elf2 = Number.NEGATIVE_INFINITY;
  let elf3 = Number.NEGATIVE_INFINITY;

  for (const currentElf of caloriesPerElf) {
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

const main = async (filename: string, part: "part1" | "part2") => {
  const caloriesPerElf = await readFile(filename);

  const result = { part1, part2 }[part](caloriesPerElf);

  console.log(result);
};

main("./input.txt", part);
