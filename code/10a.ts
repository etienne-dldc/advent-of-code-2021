export {};

const input = await Deno.readTextFile(`./data/10.txt`);
// const input = `[({(<(())[]>[[{[]{<()<>>
// [(()[<>])]({[<{<<[]>>(
// {([(<{}[<>[]}>{[]{[(<()>
// (((({<>}<{<{<>}{[]{[]{}
// [[<[([]))<([[{}[[()]]]
// [{[{({}]{}}([{[{{{}}([]
// {<[[]]>}<{[{[{[]{()[[[]
// [<(<(<(<{}))><([]([]()
// <{([([[(<>()){}]>(<<{{
// <{([{{}}[<[[[<>{}]]]>[]]
// `;

const lines = input.trim().split(`\n`);

type Open = "(" | "[" | "{" | "<";
type Close = ")" | "]" | "}" | ">";

const pairs: Record<Open, Close> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const closeScores: Record<Close, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

let score = 0;
for (const line of lines) {
  const res = parser(line);
  if (res !== null) {
    score += closeScores[res];
  }
}

console.log({ score });

function parser(content: string): Close | null {
  const stack: Array<Open> = [];
  for (const char of content) {
    const expectedClose = pairs[stack[stack.length - 1]];
    if (char === expectedClose) {
      stack.pop();
      continue;
    }
    if (char in pairs) {
      stack.push(char as Open);
      continue;
    }
    return char as Close;
  }
  return null;
}
