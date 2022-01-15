class Body {
  #_children;
  #_name;
  #_parent;

  constructor(name) {
    this.#_name = name;
    this.#_children = [];
  }

  get name() {
    return this.#_name;
  }

  set parent(p) {
    this.#_parent = p;
  }

  get parent() {
    return this.#_parent;
  }

  push(child) {
    this.#_children.push(child);
  }

  get children() {
    return this.#_children;
  }

  get orbits() {
    let p = this.#_parent;
    let orbits = 0;
    while (p) {
      orbits += 1;
      p = p.parent;
    }
    return orbits;
  }
}

const input = (raw) => {
  const bodies = new Map();
  const hosts = raw.split("\n").map((v) => v.split(")"));
  for (const [host, satellite] of hosts) {
    const hostBody =
      bodies.get(host) ?? bodies.set(host, new Body(host)).get(host);
    const satelliteBody =
      bodies.get(satellite) ??
      bodies.set(satellite, new Body(satellite)).get(satellite);

    hostBody.push(satelliteBody);
    satelliteBody.parent = hostBody;
  }

  return bodies;
};

export const part1 = (raw) => {
  const bodies = input(raw);
  return [...bodies.values()].reduce((sum, b) => sum + b.orbits, 0);
};

export const part2 = (raw) => {
  const bodies = input(raw);

  const me = bodies.get("YOU");
  const he = bodies.get("SAN");

  const myOrbits = new Set();
  let parent = me.parent;
  while (parent) {
    myOrbits.add(parent);
    parent = parent.parent;
  }

  let common;
  parent = he.parent;
  while (parent) {
    if (myOrbits.has(parent)) {
      common = parent;
      break;
    }
    parent = parent.parent;
  }

  let meDepth = 0;
  parent = me.parent;
  while (parent) {
    if (parent === common) {
      break;
    }
    parent = parent.parent;
    meDepth += 1;
  }

  let heDepth = 0;
  parent = he.parent;
  while (parent) {
    if (parent === common) {
      break;
    }
    parent = parent.parent;
    heDepth += 1;
  }

  return meDepth + heDepth;
};
