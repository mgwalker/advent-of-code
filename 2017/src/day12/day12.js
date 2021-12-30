const input = (raw) => {
  const programs = new Map();

  raw
    .trim()
    .split("\n")
    .map((program) => {
      const [id, connections] = program.split(" <-> ");
      const neighbors = connections.replace(/\s/g, "").split(",").map(Number);
      return { id: +id, neighbors };
    })
    .forEach((program) => programs.set(program.id, program));

  for (const program of programs.values()) {
    program.neighbors = program.neighbors.map((id) => programs.get(id));
  }

  return programs;
};

const findGroup = (from, withID) => {
  const visited = new Set([withID]);

  const queue = from.get(withID).neighbors;
  while (queue.length > 0) {
    const program = queue.pop();
    if (!visited.has(program.id)) {
      visited.add(program.id);

      queue.push(...program.neighbors);
    }
  }

  return visited;
};

export const part1 = (raw) => {
  const allPrograms = input(raw);
  return findGroup(allPrograms, 0).size;
};

export const part2 = (raw) => {
  const ungroupedPrograms = input(raw);
  const groups = [];

  for (const id of ungroupedPrograms.keys()) {
    const group = findGroup(ungroupedPrograms, id);
    for (const gid of group) {
      ungroupedPrograms.delete(gid);
    }

    groups.push(group);
  }

  return groups.length;
};
