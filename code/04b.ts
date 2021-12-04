export {};

const input = await Deno.readTextFile(`./data/04.txt`);

const [listStr, ...boardsStr] = input.trim().split("\n\n");

const nums = listStr.split(",").map((v) => parseInt(v));

const boards = boardsStr.map((v) =>
  v
    .trim()
    .split("\n")
    .map((v) =>
      v
        .trim()
        .split(/ +/)
        .map((v) => parseInt(v))
    )
);

function isWin(nums: Array<number>, boards: Array<Array<number>>): boolean {
  for (const line of boards) {
    if (line.every((v) => nums.includes(v))) {
      return true;
    }
  }
  for (let i = 0; i < boards[0].length; i++) {
    const col = boards.map((v) => v[i]);
    if (col.every((v) => nums.includes(v))) {
      return true;
    }
  }
  return false;
}

let remainingBoards = boards.slice();

function findWin() {
  let size = 3;
  while (true) {
    const current = nums.slice(0, size);
    const first = remainingBoards[0];
    remainingBoards = remainingBoards.filter((v) => !isWin(current, v));
    if (remainingBoards.length === 0) {
      return { board: first, nums: current };
    }
    size++;
  }
}

const win = findWin();

const sum = win.board
  .flat()
  .filter((v) => !win.nums.includes(v))
  .reduce((acc, i) => acc + i, 0);

console.log({
  result: sum * win.nums[win.nums.length - 1],
});
