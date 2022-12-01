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

const part1 = (caloriesPerElf: number[]): number =>
  caloriesPerElf.reduce(
    (highest, current) => (current > highest ? current : highest),
    0
  );

const part2 = (caloriesPerElf: number[]): number => {
  const top3Calories = caloriesPerElf.reduce(
    (previous, currentElf) => {
      if (currentElf > previous.elf1) {
        return {
          elf1: currentElf,
          elf2: previous.elf1,
          elf3: previous.elf2,
        };
      }

      if (currentElf > previous.elf2) {
        return { elf1: previous.elf1, elf2: currentElf, elf3: previous.elf2 };
      }

      if (currentElf > previous.elf3) {
        return {
          elf1: previous.elf1,
          elf2: previous.elf2,
          elf3: currentElf,
        };
      }

      return previous;
    },
    {
      elf1: Number.NEGATIVE_INFINITY,
      elf2: Number.NEGATIVE_INFINITY,
      elf3: Number.NEGATIVE_INFINITY,
    }
  );

  return top3Calories.elf1 + top3Calories.elf2 + top3Calories.elf3;
};

const main = async (filename: string, part: "part1" | "part2") => {
  const caloriesPerElf = await readFile(filename);

  const result = { part1, part2 }[part](caloriesPerElf);

  console.log(result);
};

main("./input.txt", part);
