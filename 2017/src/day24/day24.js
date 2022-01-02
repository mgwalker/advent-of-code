let parsedInput = false;

const input = (raw) => {
  if (parsedInput !== false) {
    return parsedInput;
  }

  const allPipeSegments = new Set(raw.trim().split("\n"));

  const scores = [];
  const queue = [[0, 1, 0, allPipeSegments]];

  // eslint-disable-next-line no-unreachable-loop
  while (queue.length > 0) {
    const [score, length, needed, pipes] = queue.pop();

    const r = new RegExp(`((^|\\/)${needed}(\\/|$))`);

    const possiblePipes = [...pipes.values()].filter((s) => r.test(s));
    if (possiblePipes.length === 0) {
      scores.push([length, score]);
    }

    for (const pipe of possiblePipes) {
      const newEnd = +pipe.replace(r, "");
      const newScore = score + (needed + newEnd);
      const newPipes = new Set([...pipes]);
      newPipes.delete(pipe);

      queue.push([newScore, length + 1, newEnd, newPipes]);
    }
  }

  parsedInput = scores;
  return scores;
};

export const part1 = (raw) => {
  const scores = input(raw);
  return Math.max(...new Set(scores.map(([, score]) => score)));
};

export const part2 = (raw) => {
  const scores = input(raw);

  const length = Math.max(...new Set(scores.map(([a]) => a)));
  const atLength = scores.filter(([a]) => a === length);

  return Math.max(...new Set(atLength.map(([, score]) => score)));
};
