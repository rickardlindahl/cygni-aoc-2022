import { readFileSync } from "node:fs";
import { win32 } from "node:path";
import path from "path";

type OpponentMove = "A" | "B" | "C";
type PlayerMove = "X" | "Y" | "Z";
type Strategy = [OpponentMove, PlayerMove];

const score = { win: 6, draw: 3, lose: 0, rock: 1, paper: 2, scissors: 3 };

const readFile = (filename: string): Strategy[] =>
  readFileSync(path.resolve(__dirname, filename))
    .toString()
    .trim()
    .split("\n")
    .map((row) => row.split(" ") as Strategy);

type Move = "rock" | "paper" | "scissors";

const playerInputToMove: {
  [key in PlayerMove]: Move;
} = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const opponentMoveToMove: {
  [key in OpponentMove]: Move;
} = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const part1Mapper: {
  [key in Move]: {
    [key in Move]: number;
  };
} = {
  rock: {
    rock: score.draw + score.rock,
    paper: score.lose + score.rock,
    scissors: score.win + score.rock,
  },
  paper: {
    rock: score.win + score.paper,
    paper: score.draw + score.paper,
    scissors: score.lose + score.paper,
  },
  scissors: {
    rock: score.lose + score.scissors,
    paper: score.win + score.scissors,
    scissors: score.draw + score.scissors,
  },
};

const part2Mapper: {
  [key in PlayerMove]: {
    [key in Move]: number;
  };
} = {
  X: {
    rock: score.lose + score.scissors,
    paper: score.lose + score.rock,
    scissors: score.lose + score.paper,
  },
  Y: {
    rock: score.draw + score.rock,
    paper: score.draw + score.paper,
    scissors: score.draw + score.scissors,
  },
  Z: {
    rock: score.win + score.paper,
    paper: score.win + score.scissors,
    scissors: score.win + score.rock,
  },
};

const part1 = (input: Strategy[]): number =>
  input.reduce<number>(
    (result, [opponentMove, playerMove]) =>
      result +
      part1Mapper[playerInputToMove[playerMove]][
        opponentMoveToMove[opponentMove]
      ],
    0
  );

const part2 = (input: Strategy[]): number =>
  input.reduce<number>(
    (result, [opponentMove, playerMove]) =>
      result + part2Mapper[playerMove][opponentMoveToMove[opponentMove]],
    0
  );

const part = process.env.part || "part1";
const result = (part === "part1" ? part1 : part2)(readFile("../input.txt"));
console.log(result);
