export {};

const input = await Deno.readTextFile(`./data/06.txt`);
// const input = `3,4,3,1,2`;

const nums = input.trim().split(",").map(Number);

type Population = Map<number, number>;

const population: Population = new Map();

nums.forEach((days) => {
  population.set(days, (population.get(days) ?? 0) + 1);
});

console.log(population);

function nextDay(population: Population): Population {
  const nextPopulation: Population = new Map();
  for (const [days, count] of population.entries()) {
    if (days === 0) {
      nextPopulation.set(6, (nextPopulation.get(6) ?? 0) + count);
      nextPopulation.set(8, (nextPopulation.get(8) ?? 0) + count);
    } else {
      nextPopulation.set(days - 1, (nextPopulation.get(days - 1) ?? 0) + count);
    }
  }
  return nextPopulation;
}

function play(days: number, population: Population): number {
  let pop = population;
  for (let i = 0; i < days; i++) {
    pop = nextDay(pop);
  }
  return Array.from(pop.values()).reduce((a, b) => a + b, 0);
}

console.log({ count: play(256, population) });
