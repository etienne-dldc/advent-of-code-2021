export {};

const input = await Deno.readTextFile(`./data/06.txt`);
// const input = `3,4,3,1,2`;

const nums = input.trim().split(",").map(Number);

function nextDay() {
  const added = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      nums[i] = 6;
      added.push(8);
    } else {
      nums[i] -= 1;
    }
  }
  nums.push(...added);
}

for (let i = 0; i < 80; i++) {
  nextDay();
}

console.log({ count: nums.length });
