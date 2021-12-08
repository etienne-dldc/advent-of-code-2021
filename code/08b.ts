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

const numSegCount = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
};

data.forEach((line) => {
  const one = notNil(line.signals.find((signal) => signal.length === 2));
  const four = notNil(line.signals.find((signal) => signal.length === 4));
  const seven = notNil(line.signals.find((signal) => signal.length === 3));
  const eight = notNil(line.signals.find((signal) => signal.length === 7));
  const zeroSixNine = line.signals.filter((signal) => signal.length === 6);
  const six = notNil(
    zeroSixNine.find((signal) => {
      return segmentInclude(signal, seven) === false;
    })
  );
  const zero = notNil(
    zeroSixNine.find((signal) => {
      if (signal === six) {
        return false;
      }
      return segmentInclude(signal, four) === false;
    })
  );
  const nine = notNil(
    zeroSixNine.find((signal) => {
      if (signal === zero) {
        return false;
      }
      if (signal === six) {
        return false;
      }
      return true;
    })
  );
  const twoThreeFive = line.signals.filter((signal) => signal.length === 5);
  const three = notNil(
    twoThreeFive.find((signal) => {
      return segmentInclude(signal, seven);
    })
  );
  const five = notNil(
    twoThreeFive.find((signal) => {
      if (signal === three) {
        return false;
      }
      return segmentInclude(nine, signal);
    })
  );
  const two = notNil(
    twoThreeFive.find((signal) => {
      if (signal === three) {
        return false;
      }
      if (signal === five) {
        return false;
      }
      return true;
    })
  );

  const nums = [zero, one, two, three, four, five, six, seven, eight, nine];

  const output = parseInt(
    line.output.map((v) => nums.findIndex((n) => segmentEqual(n, v))).join(``),
    10
  );

  count += output;
});

function segmentEqual(left: string, right: string): boolean {
  const l = left.split(``).sort().join(``);
  const r = right.split(``).sort().join(``);
  return l === r;
}

function segmentInclude(base: string, seg: string): boolean {
  const b = new Set(base.split(``));
  const size = b.size;
  seg.split(``).forEach((c) => {
    b.add(c);
  });
  return b.size === size;
}

function notNil<T>(value: T | undefined): T {
  if (value === undefined) {
    throw new Error(`Value is undefined`);
  }
  return value;
}

console.log({ count });
