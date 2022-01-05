const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => {
      const [, parent, child] = l.split(
        /step ([a-z]) must be finished before step ([a-z]) can begin/i
      );
      return [parent, child];
    });

const sort = ({ id: a }, { id: b }) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  return 0;
};

export const part1 = (raw) => {
  const data = input(raw);

  const nodes = new Map();

  for (const [parent, child] of data) {
    if (!nodes.has(parent)) {
      nodes.set(parent, { id: parent, parents: new Set(), children: [] });
    }
    if (!nodes.has(child)) {
      nodes.set(child, { id: child, parents: new Set(), children: [] });
    }
    nodes.get(parent).children.push(nodes.get(child));
    nodes.get(child).parents.add(nodes.get(parent));
  }

  const nextSteps = [...nodes]
    .filter(([, node]) => node.parents.size === 0)
    .map(([, node]) => node);
  const order = [];

  while (nextSteps.length > 0) {
    nextSteps.sort(sort);
    const next = nextSteps.pop();
    order.push(next.id);
    next.children.forEach((node) => {
      node.parents.delete(next);
      if (node.parents.size === 0) {
        nextSteps.push(node);
      }
    });
  }

  return order.join("");
};

export const part2 = (raw) => {
  const data = input(raw);

  const nodes = new Map();

  for (const [parent, child] of data) {
    if (!nodes.has(parent)) {
      nodes.set(parent, { id: parent, parents: new Set(), children: [] });
    }
    if (!nodes.has(child)) {
      nodes.set(child, { id: child, parents: new Set(), children: [] });
    }
    nodes.get(parent).children.push(nodes.get(child));
    nodes.get(child).parents.add(nodes.get(parent));
  }

  const time = new Map(
    [...Array(26)].map((_, i) => [String.fromCharCode(i + 65), i + 61])
  );

  let elves = 5;
  let t = 0;
  const timeRemaining = new Map();

  const nextSteps = [...nodes]
    .filter(([, node]) => node.parents.size === 0)
    .map(([, node]) => node);

  const active = new Set();

  do {
    nextSteps.sort(sort);

    for (const [id, doneTime] of timeRemaining) {
      if (doneTime === t) {
        timeRemaining.delete(id);
        active.delete(id);
        elves += 1;

        const job = nodes.get(id);
        for (const child of job.children) {
          child.parents.delete(job);
          if (child.parents.size === 0) {
            nextSteps.push(child);
          }
        }
      }
    }

    const starting = nextSteps.splice(-elves);
    elves -= starting.length;
    for (const { id } of starting) {
      timeRemaining.set(id, time.get(id) + t);
      active.add(id);
    }
    if (active.size > 0) {
      t = Math.min(...timeRemaining.values());
    }
  } while (active.size > 0);

  return t;
};
