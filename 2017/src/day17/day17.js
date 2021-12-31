const input = (raw) => +raw;

const List = () => {
  const root = {
    value: 0,
  };
  root.next = root;

  let pointer = root;

  return {
    get root() {
      return root;
    },

    advance(count) {
      for (let i = 0; i < count; i += 1) {
        pointer = pointer.next;
      }
    },

    insert(value) {
      const node = { value };
      node.next = pointer.next;
      pointer.next = node;
      pointer = node;
    },

    print() {
      const v = [];
      let next = root;
      if (next === pointer) {
        v.push(`(${next.value})`);
      } else {
        v.push(next.value);
      }
      next = next.next;

      while (next !== root) {
        if (next === pointer) {
          v.push(`(${next.value})`);
        } else {
          v.push(next.value);
        }
        next = next.next;
      }

      console.log(v.join(" "));
    },
  };
};

export const part1 = (raw) => {
  const skip = input(raw);

  const list = List();
  let insert = 1;

  for (let i = 0; i < 2017; i += 1) {
    list.advance(skip);
    list.insert(insert);
    insert += 1;
  }

  let node = list.root;
  while (node.value !== 2017) {
    node = node.next;
  }

  return node.next.value;
};

export const part2 = (raw) => {
  const skip = input(raw);

  let index = 0;
  let insert = 1;
  let afterZero = 0;

  for (let i = 0; i < 50_000_000; i += 1) {
    index = (index + skip) % insert;
    if (index === 0) {
      afterZero = insert;
    }
    insert += 1;
    index += 1;
  }

  return afterZero;
};
