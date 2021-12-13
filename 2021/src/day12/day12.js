class DefaultMap {
  constructor(defaultValue) {
    this._default = defaultValue;
    this._map = new Map();
  }

  get(key) {
    this._map.get(key) ?? this._default;
  }

  has(key) {
    return this._map.has(key);
  }

  set(key, value) {
    return this.set(key, value);
  }
}

class Cave {
  constructor(name) {
    this.name = name;
    this.end = name === "end";
    this.small = name.toLowerCase() === name;
    this.start = name === "start";
    this.connections = new Set();
    Cave._caves.set(name, this);
  }

  static _caves = new Map();

  static emptyVisitMap() {
    const map = new Map();
    for (const [key] of Cave._caves) {
      map.set(key, 0);
    }
    return map;
  }

  static get(name) {
    return Cave._caves.get(name);
  }

  *pathsToEnd({
    oneSmallRevisitAllowed = false,
    visitCount = Cave.emptyVisitMap(),
  } = {}) {
    const visits = new Map(visitCount);
    visits.set(this.name, visits.get(this.name) + 1);

    if (this.end) {
      yield this.name;
      return;
    }

    if (this.small && visits.get(this.name) > 1) {
      oneSmallRevisitAllowed = false;
    }

    let checks = Array.from(this.connections)
      .map((name) => Cave.get(name))
      .filter((cave) => !cave.start);

    if (!oneSmallRevisitAllowed) {
      checks = checks.filter(
        (cave) => (cave.small && visits.get(cave.name) == 0) || !cave.small,
      );
    }

    if (checks.length) {
      for (const check of checks) {
        for (const path of check.pathsToEnd({
          visitCount: visits,
          oneSmallRevisitAllowed,
        })) {
          yield `${this.name} --> ${path}`;
        }
      }
    } else {
      yield `${this.name} --> STOP`;
    }
  }
}

const parseInput = (raw) => {
  const caves = new Map();
  const lines = raw.split("\n");
  for (const line of lines) {
    const [a, b] = line.split("-");
    if (!caves.has(a)) {
      caves.set(a, new Cave(a));
    }
    if (!caves.has(b)) {
      caves.set(b, new Cave(b));
    }
    caves.get(a).connections.add(b);
    caves.get(b).connections.add(a);
  }
  return Cave._caves;
};

export const part1 = (raw) => {
  parseInput(raw);
  const paths = Array.from(Cave.get("start").pathsToEnd()).filter((path) =>
    path.endsWith(" --> end"),
  );
  return paths.length;
};

export const part2 = (raw) => {
  parseInput(raw);
  const paths = Array.from(
    Cave.get("start").pathsToEnd({ oneSmallRevisitAllowed: true }),
  ).filter((path) => path.endsWith(" --> end"));
  return paths.length;
};
