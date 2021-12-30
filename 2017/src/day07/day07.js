const input = (raw) => {
  const knownPrograms = new Map();

  const lines = raw.trim().split("\n");

  const programs = lines.map((programInfo) => {
    const [programData] = programInfo.split(" -> ");
    const [, name, weight] = programData.match(/(\S+) \((\d+)\)/);
    const program = { children: [], name, parent: null, weight: +weight };
    knownPrograms.set(name, program);
    return program;
  });

  lines.forEach((line) => {
    const [programData, childrenStr] = line.split(" -> ");
    const [, name] = programData.match(/(\S+) /);
    if (childrenStr) {
      const children = childrenStr.split(", ");
      const parent = knownPrograms.get(name);
      for (const childName of children) {
        const child = knownPrograms.get(childName);
        child.parent = parent;
        parent.children.push(child);
      }
    }
  });

  return programs;
};

export const part1 = (raw) => {
  const programs = input(raw);

  let root = programs[0].parent;
  while (root.parent) {
    root = root.parent;
  }
  return root.name;
};

export const part2 = (raw) => {
  const programs = input(raw);

  let root = programs[0].parent;
  while (root.parent) {
    root = root.parent;
  }

  const getChildWeight = (node) => {
    /* eslint-disable no-param-reassign */
    if (node.children.length === 0) {
      node.childWeight = 0;
      node.totalWeight = node.weight;
      return node.weight;
    }

    node.childWeight = node.children
      .map(getChildWeight)
      .reduce((sum, c) => sum + c, 0);
    node.totalWeight = node.weight + node.childWeight;
    return node.totalWeight;
  };

  getChildWeight(root);

  const queue = [[root, null]];
  while (queue.length > 0) {
    const [node, parent] = queue.pop();

    const weights = new Map();

    node.children
      .map(({ totalWeight }) => totalWeight)
      .forEach((w) => {
        weights.set(w, (weights.get(w) ?? 0) + 1);
      });

    if (new Set(weights.values()).has(1)) {
      const badWeight = [...weights.entries()]
        .filter(([, i]) => i === 1)
        .pop()[0];

      const faultyChild = node.children.find(
        ({ totalWeight }) => totalWeight === badWeight
      );

      queue.push([faultyChild, node]);
    } else {
      // The node's children all have equal weight, so it must be this node with
      // the faulty weight.
      const childWeights = parent.children.map(
        ({ totalWeight }) => totalWeight
      );

      const childWeightCount = new Map();
      childWeights.forEach((weight) => {
        childWeightCount.set(weight, (childWeightCount.get(weight) ?? 0) + 1);
      });

      const targetWeight = [...childWeightCount.entries()].find(
        ([, count]) => count > 1
      )[0];

      const targetChild = parent.children.find(
        ({ totalWeight }) => childWeightCount.get(totalWeight) === 1
      );

      const diff = targetWeight - targetChild.totalWeight;

      return targetChild.weight + diff;
    }
  }
};
