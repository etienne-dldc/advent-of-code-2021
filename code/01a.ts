export {};

const input = await Deno.readTextFile(`./data/01.txt`);

const nums = input
  .split("\n")
  .filter((v) => v.length > 0)
  .map((v) => parseInt(v, 10));

let increased = 0;

for (let i = 1; i < nums.length; i++) {
  const current = nums[i];
  const previous = nums[i - 1];
  if (current > previous) {
    increased += 1;
  }
}

console.log({ increased });
