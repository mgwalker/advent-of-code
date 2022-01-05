const input = (raw) => raw.trim().split(" ").map(Number);

const getTree = (stream) => {
  const nodes = [];
  const active = [
    {
      childCount: stream[0],
      metaCount: stream[1],
      children: [],
      metadata: [],
      parent: null,
    },
  ];

  for (let i = 2; i < stream.length; i += 1) {
    const parent = active.pop();

    if (parent.children.length === parent.childCount) {
      parent.metadata = stream.slice(i, i + parent.metaCount);
      i += parent.metaCount - 1;
      nodes.push(parent);
      // done with this node; don't add it back
    } else {
      const child = {
        childCount: stream[i],
        metaCount: stream[i + 1],
        children: [],
        metadata: [],
        parent,
      };
      parent.children.push(child);
      active.push(parent);
      active.push(child);
      i += 1;
    }
  }

  return nodes;
};

export const part1 = (raw) => {
  const stream = input(raw);
  const nodes = getTree(stream);

  return nodes
    .flatMap(({ metadata }) => metadata)
    .reduce((sum, c) => sum + c, 0);
};

export const part2 = (raw) => {
  const stream = input(raw);
  const nodes = getTree(stream);

  const nodeValue = (node) => {
    if (node.children.length === 0) {
      return node.metadata.reduce((sum, c) => sum + c, 0);
    }

    return node.metadata
      .filter((v) => v <= node.children.length)
      .reduce((sum, index) => sum + nodeValue(node.children[index - 1]), 0);
  };

  const root = nodes.find(({ parent }) => parent === null);

  return nodeValue(root);
};
