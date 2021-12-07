export {};

const input = await Deno.readTextFile(`./data/07.txt`);
// const input = `16,1,2,0,4,2,7,1,2,14`;

const nums = input.trim().split(",").map(Number);

const average = nums.reduce((acc, curr) => acc + curr) / nums.length;

function fuelCost(target: number): number {
  let total = 0;
  for (const num of nums) {
    const dist = Math.abs(num - target);
    total += ((dist + 1) * dist) / 2;
  }
  return total;
}

let i = Math.round(average);
let cost = fuelCost(i);

while (true) {
  const prev = fuelCost(i - 1);
  const next = fuelCost(i + 1);
  if (cost < prev && cost < next) {
    break;
  }
  if (prev < cost) {
    i--;
    cost = prev;
    continue;
  }
  if (next < cost) {
    i++;
    cost = next;
    continue;
  }
}

console.log({ i, cost });
