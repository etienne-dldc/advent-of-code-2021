export {};

const input = await Deno.readTextFile(`./data/09.txt`);
// const input = ``;

const grid = input
  .trim()
  .split(`\n`)
  .map((line) => line.split(``).map((v) => parseInt(v, 10)));

const all = grid.flat();

const width = grid[0].length;
const height = grid.length;

function gridRead(x: number, y: number): number | null {
  const pos = y * width + x;
  if (pos < 0 || pos > all.length) {
    return null;
  }
  return all[pos];
}

function isLowerThan(current: number, val: number | null): boolean {
  return val === null ? true : current < val;
}

const minimums: Array<{ x: number; y: number; val: number }> = [];

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const up = gridRead(x, y - 1);
    const down = gridRead(x, y + 1);
    const left = gridRead(x - 1, y);
    const right = gridRead(x + 1, y);
    const current = gridRead(x, y);
    if (current === null) {
      throw new Error(`Invalid grid`);
    }
    if (
      isLowerThan(current, up) &&
      isLowerThan(current, down) &&
      isLowerThan(current, left) &&
      isLowerThan(current, right)
    ) {
      minimums.push({ x, y, val: current });
    }
  }
}

console.log(minimums);

const sum = minimums.reduce((acc, cur) => acc + cur.val + 1, 0);

console.log({ sum });
