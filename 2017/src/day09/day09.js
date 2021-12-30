const input = (raw) => raw;

function* drops(stream) {
  let i = 0;
  while (i < stream.length) {
    while (stream[i] === "!") {
      i += 2;
    }
    if (i < stream.length) {
      yield stream[i];
    }
    i += 1;
  }
}

const getScore = (node) => {
  if (node.children.length === 0) {
    return node.score;
  }

  return (
    node.score + node.children.reduce((sum, child) => sum + getScore(child), 0)
  );
};

const getGarbage = (node) => {
  if (node.children.length === 0) {
    return node.garbage.length;
  }
  return (
    node.garbage.length +
    node.children.reduce((sum, child) => sum + getGarbage(child), 0)
  );
};

const process = (stream) => {
  const root = { score: 1, parent: null, children: [], garbage: [] };
  let current = root;
  let inGarbage = false;

  for (const drop of drops(stream.substring(1, stream.length - 2))) {
    if (drop === "{" && !inGarbage) {
      const group = {
        score: current.score + 1,
        parent: current,
        children: [],
        garbage: [],
      };
      current.children.push(group);
      current = group;
    }
    if (drop === "}" && !inGarbage) {
      current = current.parent;
    }
    if (drop === "<" && !inGarbage) {
      inGarbage = true;
    } else if (drop === ">") {
      inGarbage = false;
    } else if (inGarbage) {
      current.garbage.push(drop);
    }
  }

  return root;
};

export const part1 = (raw) => {
  const stream = input(raw);
  const root = process(stream);

  return getScore(root);
};

export const part2 = (raw) => {
  const stream = input(raw);
  const root = process(stream);

  return getGarbage(root);
};
