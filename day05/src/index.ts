import { readFileSync } from "node:fs";
import path from "path";

const parseCrates = (row: string) => {
  const matches = row.matchAll(/(\[[A-Z]\])/g);

  const crates = new Array(Math.ceil(row.length / 4));

  for (const match of matches) {
    crates[(match?.index ?? 0) / 4] = match[1].match(/[A-Z]/)![0];
  }

  return crates;
};

type Strategy = [number, number, number];

const parseStrategy = (row: string): Strategy => {
  const match = row.match(/\d+/g);
  if (!match) {
    return [] as unknown as Strategy;
  }

  return [
    parseInt(match[0], 10),
    parseInt(match[1], 10),
    parseInt(match[2], 10),
  ];
};

const readFile = (filename: string) =>
  readFileSync(path.resolve(__dirname, filename))
    .toString()
    .split("\n")
    .reduce<{
      step: 1 | 2;
      crates: string[][];
      strategy: Strategy[];
    }>(
      (result, row) => {
        if (row === "") {
          return { ...result, step: 2 };
        }

        if (result.step === 1) {
          const crates = parseCrates(row);

          const columns = Math.ceil(row.length / 4);
          const newArray = new Array(columns);
          for (let i = 0; i < columns; i++) {
            newArray[i] = [...(crates[i] ?? []), ...(result.crates[i] ?? [])];
          }

          return { ...result, crates: newArray };
        }

        return {
          ...result,
          strategy: [...result.strategy, parseStrategy(row)],
        };
      },
      {
        step: 1,
        crates: [] as string[][],
        strategy: [] as [number, number, number][],
      }
    );

const part1 = <T extends { crates: string[][]; strategy: Strategy[] }>({
  crates,
  strategy,
}: T) => {
  strategy.forEach((strat) => {
    const [numberOfCrates, from, to] = strat;
    for (let i = 0; i < numberOfCrates; i++) {
      const crate = crates[from - 1].pop();
      crates[to - 1].push(crate!);
    }
  });

  return crates.reduce<string>(
    (result, current) => `${result}${current.pop()}`,
    ""
  );
};

const part2 = <T extends { crates: string[][]; strategy: Strategy[] }>({
  crates,
  strategy,
}: T) => {
  strategy.forEach((strat) => {
    const [numberOfCrates, from, to] = strat;
    const cratezzz = crates[from - 1].splice(
      crates[from - 1].length - numberOfCrates
    );
    crates[to - 1] = [...crates[to - 1], ...cratezzz];
  });

  return crates.reduce<string>(
    (result, current) => `${result}${current.pop()}`,
    ""
  );
};

const part = process.env.part || "part1";
const result = (part === "part1" ? part1 : part2)(readFile("../input.txt"));
console.log(result);
