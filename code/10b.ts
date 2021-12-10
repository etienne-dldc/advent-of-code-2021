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

const closeScores: Record<Open, number> = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const scores = lines
  .map(parser)
  .filter((x): x is number => x !== null)
  .sort((a, b) => b - a);

const middle = scores[Math.floor(scores.length / 2)];

console.log({ middle });

function parser(content: string): null | number {
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
    // invalid
    return null;
  }
  stack.reverse();
  let score = 0;
  for (const char of stack) {
    score = score * 5 + closeScores[char];
  }
  return score;
}
