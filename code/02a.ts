export {};

const input = await Deno.readTextFile(`./data/02.txt`);

const ops = input
  .split("\n")
  .filter((v) => v.length > 0)
  .map((v) => v.split(" "))
  .map(([op, num]) => ({ op, num: parseInt(num, 10) }));

let x = 0;
let depth = 0;

ops.forEach(({ op, num }) => {
  if (op === "forward") {
    x += num;
    return;
  }
  if (op === "up") {
    depth -= num;
    return;
  }
  if (op === "down") {
    depth += num;
    return;
  }
  throw new Error(`Unknown op: ${op}`);
});

console.log({ x, depth, product: x * depth });
