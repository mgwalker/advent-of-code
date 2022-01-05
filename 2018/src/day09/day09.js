class MarbleBoard {
  #_current;
  constructor() {
    this.#_current = { value: 0 };
    this.#_current.next = this.#_current;
    this.#_current.previous = this.#_current;
  }

  add(value) {
    const node = { value, next: null, previous: null };
    const after = this.#_current.next;

    node.previous = after;
    node.next = after.next;
    after.next.previous = node;
    after.next = node;
    this.#_current = node;
  }

  remove() {
    let take = this.#_current;
    for (let i = 0; i < 7; i += 1) {
      take = take.previous;
    }

    take.previous.next = take.next;
    take.next.previous = take.previous;
    this.#_current = take.next;

    return take.value;
  }

  print() {
    const head = this.#_current;
    let node = head;
    const v = [];
    do {
      v.push(node.value);
      node = node.next;
    } while (node !== head);
    console.log(v.join("  "));
  }
}

class DefaultMap extends Map {
  #_default;

  constructor(defaultValue) {
    super();
    this.#_default = defaultValue;
  }

  get(key) {
    return super.get(key) ?? this.#_default;
  }
}

const input = (raw) => {
  const [, players, marbles] = raw.match(
    /^(\d+) players; last marble is worth (\d+) points$/
  );
  return { players: +players, marbles: +marbles };
};

export const part1 = (raw) => {
  const { players, marbles } = input(raw);

  const scores = new DefaultMap(0);
  const b = new MarbleBoard();

  for (let i = 1; i <= marbles; i += 1) {
    if (i % 23 === 0) {
      scores.set(i % players, scores.get(i % players) + i + b.remove());
    } else {
      b.add(i);
    }
  }

  return Math.max(...scores.values());
};

export const part2 = (raw) => {
  const { players, marbles } = input(raw);

  const scores = new DefaultMap(0);
  const b = new MarbleBoard();

  for (let i = 1; i <= marbles * 100; i += 1) {
    if (i % 23 === 0) {
      scores.set(i % players, scores.get(i % players) + i + b.remove());
    } else {
      b.add(i);
    }
  }

  return Math.max(...scores.values());
};
