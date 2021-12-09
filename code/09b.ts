export {};

const input = await Deno.readTextFile(`./data/09.txt`);
// const input = `2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678
// `;

const grid = input
  .trim()
  .split(`\n`)
  .map((line) => line.split(``).map((v) => parseInt(v, 10)));

const width = grid[0].length;
const height = grid.length;

function gridRead(x: number, y: number): number | null {
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return null;
  }
  return grid[y][x];
}

function isLowerThan(current: number, val: number | null): boolean {
  return val === null ? true : current < val;
}

const minimums: Array<{ x: number; y: number; val: number }> = [];

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
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

const sizes: Array<number> = [];

const visited = new Set<string>();

function solve(x: number, y: number): number {
  const coord = `${x},${y}`;
  if (visited.has(coord)) {
    return 0;
  }
  const val = gridRead(x, y);
  visited.add(coord);
  if (val === null) {
    return 0;
  }
  if (val === 9) {
    return 0;
  }
  const left = solve(x + 1, y);
  const right = solve(x - 1, y);
  const up = solve(x, y - 1);
  const down = solve(x, y + 1);
  return 1 + left + right + up + down;
}

minimums.forEach((m) => {
  sizes.push(solve(m.x, m.y));
});

console.log(
  sizes
    .sort((l, r) => r - l)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)
);
