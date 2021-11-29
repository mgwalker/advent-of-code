import run from "aocrunner";

const parseInput = (rawInput) => rawInput.trim().split("\n");

const part1 = (rawInput) => {
  let statements = parseInput(rawInput);

  const evaluate = (str) => {
    const steps = str.replace(/\s+/gi, " ").split(" ");
    let accumulator = +steps.shift();
    while (steps.length) {
      const step = steps.shift();
      switch (step) {
        case "+":
          accumulator += +steps.shift();
          break;
        case "*":
          accumulator *= +steps.shift();
          break;
      }
    }
    return accumulator;
  };

  const evals = statements.map((statement) => {
    const open = [];
    const close = [];

    statement.split("").forEach((s, i) => {
      if (s === "(") {
        open.push(i);
      } else if (s === ")") {
        close.push(i);
      }
    });

    while (open.length > 0) {
      const oi = open.pop();
      const ci = close.filter((c) => c > oi).shift();
      close.splice(close.indexOf(ci), 1);

      const parenEval = statement.substring(oi + 1, ci);

      statement =
        statement.substring(0, oi) +
        `${evaluate(parenEval)}`.padEnd(ci - oi + 1, " ") +
        statement.substring(ci + 1);
    }

    return evaluate(statement);
  });

  return evals.reduce((sum, v) => sum + v, 0);
};

const part2 = (rawInput) => {
  const statements = parseInput(rawInput);

  const evaluate = (str) => {
    const steps = str.trim().replace(/\s+/gi, " ").split(" ");

    while (steps.includes("+")) {
      const index = steps.indexOf("+");
      const inner = steps.slice(index - 1, index + 2);
      steps.splice(index - 1, 3, +inner[0] + +inner[2]);
    }

    let accumulator = +steps.shift();
    while (steps.length) {
      const step = steps.shift();
      switch (step) {
        case "+":
          accumulator += +steps.shift();
          break;
        case "*":
          accumulator *= +steps.shift();
          break;
      }
    }
    return accumulator;
  };

  const evals = statements.map((statement) => {
    const open = [];
    const close = [];

    statement.split("").forEach((s, i) => {
      if (s === "(") {
        open.push(i);
      } else if (s === ")") {
        close.push(i);
      }
    });

    while (open.length > 0) {
      const oi = open.pop();
      const ci = close.filter((c) => c > oi).shift();
      close.splice(close.indexOf(ci), 1);

      const parenEval = statement.substring(oi + 1, ci);

      statement =
        statement.substring(0, oi) +
        `${evaluate(parenEval)}`.padEnd(ci - oi + 1, " ") +
        statement.substring(ci + 1);
    }

    return evaluate(statement);
  });

  return evals.reduce((sum, v) => sum + v, 0);
};

run({
  part1: {
    tests: [
      { input: `1 + 2 * 3 + 4 * 5 + 6`, expected: 71 },
      { input: `1 + 2 * (3 + 4) * 5 + 6`, expected: 111 },
      { input: `1 + (2 * (3 + 4) * 5) + 6`, expected: 77 },
      {
        input: `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`,
        expected: 13632,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
