export {};

const input = await Deno.readTextFile(`./data/05.txt`);

const lines = input
  .trim()
  .split("\n")
  .map((l) => {
    const [p1, p2] = l.trim().split(" -> ");
    const [x1, y1] = p1.split(",").map(Number);
    const [x2, y2] = p2.split(",").map(Number);
    return { x1, y1, x2, y2 };
  });

const hvLines = lines.filter((l) => l.x1 === l.x2 || l.y1 === l.y2);

console.log(hvLines);

const grid = new Map<string, number>();

let maxX = 0;
let maxY = 0;

function gridAdd(x: number, y: number) {
  maxX = Math.max(maxX, x);
  maxY = Math.max(maxY, y);
  const key = `${x},${y}`;

  if (grid.has(key)) {
    grid.set(key, grid.get(key)! + 1);
  } else {
    grid.set(`${x},${y}`, 1);
  }
}

hvLines.forEach((line) => {
  if (line.x1 === line.x2) {
    // horizontal line
    const [y1, y2] = [line.y1, line.y2].sort((a, b) => a - b);
    console.log(`x: ${line.x1} y: ${line.y1} -> ${line.y2}`);
    for (let y = y1; y <= y2; y++) {
      gridAdd(line.x1, y);
    }
  }
  if (line.y1 === line.y2) {
    // vertical line
    console.log(`x: ${line.x1} y: ${line.y1} -> ${line.x2}`);
    const [x1, x2] = [line.x1, line.x2].sort((a, b) => a - b);
    for (let x = x1; x <= x2; x++) {
      gridAdd(x, line.y1);
    }
  }
  // console.log(print());
});

let count = 0;

Array.from(grid.entries()).forEach(([_k, v]) => {
  if (v > 1) {
    count++;
  }
});

console.log({ count, maxX, maxY });

function print() {
  let str = "";

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const key = `${x},${y}`;
      if (grid.has(key)) {
        str += grid.get(key)!;
      } else {
        str += ".";
      }
    }
    str += "\n";
  }
  return str;
}

await Deno.writeTextFile(`./out/05.txt`, print());
