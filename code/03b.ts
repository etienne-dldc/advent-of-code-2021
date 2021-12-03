export {};

const input = await Deno.readTextFile(`./data/03.txt`);

const nums = input
  .trim()
  .split("\n")
  .filter((l) => l.length > 0)
  .map((l) => parseInt(l, 2));

function bitAt(num: number, pos: number): number {
  return (num >> (11 - pos)) & 1;
}

function mostCommonBitAt(
  nums: Array<number>,
  pos: number,
  ifEqual: 0 | 1
): 0 | 1 {
  const bits = nums.map((v) => bitAt(v, pos));
  const count0 = bits.filter((v) => v === 0).length;
  const count1 = bits.filter((v) => v === 1).length;
  return count0 === count1 ? ifEqual : count0 > count1 ? 0 : 1;
}

function filter(
  nums: Array<number>,
  pos: number,
  condition: 0 | 1
): Array<number> {
  return nums.filter((n) => bitAt(n, pos) === condition);
}

function invertBit(bit: 0 | 1): 0 | 1 {
  return (~bit & 1) as 0 | 1;
}

function find(nums: Array<number>, invert: boolean) {
  let current = [...nums];
  let pos = 0;
  while (current.length > 1) {
    const condition = invert
      ? invertBit(mostCommonBitAt(current, pos, 1))
      : mostCommonBitAt(current, pos, 1);
    current = filter(current, pos, condition);
    pos++;
  }
  return current[0];
}

const oxygen = find(nums, false);
const co2 = find(nums, true);

console.log({ oxygen, co2, result: oxygen * co2 });
