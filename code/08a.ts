export {};

const input = await Deno.readTextFile(`./data/08.txt`);
// const input = ``;

const data = input
  .trim()
  .split(`\n`)
  .map((line) => {
    const [signals, output] = line.split(` | `);
    return {
      signals: signals.split(` `),
      output: output.split(` `),
    };
  });

let count = 0;

data.forEach((line) => {
  count += line.output.filter(
    (out) =>
      out.length === 2 ||
      out.length === 4 ||
      out.length === 3 ||
      out.length === 7
  ).length;
});

console.log({ count });
