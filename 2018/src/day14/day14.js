import mn from "mnemonist";

const LinkedList = mn.LinkedList;

const input = (raw) => +raw;

export const part1 = (raw) => {
  const recipesToTry = input(raw);
  const list = LinkedList.from([3, 7]);

  const elves = [list.head, list.tail];

  while (list.size < recipesToTry + 10) {
    const score = elves
      .reduce((sum, { item }) => sum + item, 0)
      .toString()
      .split("");

    for (const num of score) {
      list.push(+num);
    }

    const shift1 = elves[0].item;
    for (let i = 0; i <= shift1; i += 1) {
      elves[0] = elves[0].next ?? list.head;
    }

    const shift2 = elves[1].item;
    for (let i = 0; i <= shift2; i += 1) {
      elves[1] = elves[1].next ?? list.head;
    }
  }

  let node = list.head;
  for (let i = 0; i < recipesToTry; i += 1) {
    node = node.next ?? list.head;
  }

  const score = [];
  for (let i = 0; i < 10; i += 1) {
    score.push(node.item);
    node = node.next;
  }

  return +score.join("");
};

export const part2 = (raw) => {
  const recipesToFind = input(raw).toString();
  const list = LinkedList.from([3, 7]);

  const elves = [list.head, list.tail];

  const targetSize = recipesToFind.toString().length;
  let from = list.head;
  let last = 0;

  while (last !== recipesToFind) {
    const score = elves
      .reduce((sum, { item }) => sum + item, 0)
      .toString()
      .split("");

    for (const num of score) {
      list.push(+num);

      if (list.size > targetSize) {
        const lastFew = [];
        let pointer = from;
        for (let i = 0; i < targetSize; i += 1) {
          lastFew.push(pointer.item);
          pointer = pointer.next;
        }
        last = lastFew.join("");

        from = from.next;

        if (last === recipesToFind) {
          break;
        }
      }
    }

    const shift1 = elves[0].item;
    for (let i = 0; i <= shift1; i += 1) {
      elves[0] = elves[0].next ?? list.head;
    }

    const shift2 = elves[1].item;
    for (let i = 0; i <= shift2; i += 1) {
      elves[1] = elves[1].next ?? list.head;
    }
  }

  return list.size - targetSize - 1;
};
