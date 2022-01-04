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

  const sort = ({ id: a }, { id: b }) => {
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  };

  while (nextSteps.length > 0) {
    nextSteps.sort(sort);
    const next = nextSteps.pop();
    order.push(next.id);
    next.children.forEach((node) => {
      node.parents.delete(next);
      if (node.parents.size === 0 && !order.includes(node.id)) {
        nextSteps.push(node);
      }
    });
  }

  return order.join("");
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};
