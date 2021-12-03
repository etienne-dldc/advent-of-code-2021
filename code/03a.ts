export {};

const input = await Deno.readTextFile(`./data/03.txt`);

const nums = input
  .trim()
  .split("\n")
  .filter((l) => l.length > 0)
  .map((l) => l.split(""));

const gammaArr = nums
  .reduce(
    (acc, cur) => {
      return acc.map((v, i) => v + (cur[i] === "0" ? -1 : 1));
    },
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  )
  .map((v) => (v > 0 ? "1" : "0"));

const gamma = parseInt(gammaArr.join(""), 2);
const epsilon = parseInt(
  gammaArr.map((v) => (v === "0" ? "1" : 0)).join(""),
  2
);

console.log({
  gamma,
  epsilon,
  result: gamma * epsilon,
});
