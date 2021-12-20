class Elf {
  constructor(id) {
    this.id = id;
    this.next = null;
    this.prev = null;
  }
}

class ElfCircle {
  constructor(howManyElves) {
    this.length = howManyElves;

    this.head = new Elf(1);
    let tail = this.head;

    const halfsies = Math.floor(howManyElves / 2) + 1;

    for (let i = 2; i <= howManyElves; i += 1) {
      const elf = new Elf(i);
      elf.prev = tail;
      tail.next = elf;
      elf.next = this.head;
      tail = elf;
      if (i === halfsies) {
        this.target = elf;
      }
    }
    this.head.prev = tail

    this.player = this.head;
  }

  remove(elf) {
    if (this.head === elf) {
      this.head.prev.next = elf.next;
      this.head.next.prev = elf.prev;
      this.head = elf.next;
    }

    elf.prev.next = elf.next;
    elf.next.prev = elf.prev;
    this.length -= 1;
    if (this.length % 2 === 0) {
      this.target = this.target.next;
    } else {
      this.target = this.target.prev;
    }
  }

  next() {
    this.player = this.player.next;
    this.target = this.target.next;
  }

  toString() {
    const str = [];
    let elf = this.head;
    for (let i = 0; i < this.length; i += 1) {
      str.push(elf.id);
      elf = elf.next;
    }
    return str.join(" -> ");
  }
}

const raw = 3_014_603;
// const raw = 5;

const part1 = () => {
  const circle = new ElfCircle(raw);
  while (circle.length > 1) {
    circle.remove(circle.player.next)
    circle.next()
  }

  return circle.player.id;
};

const part2 = () => {
  const circle = new ElfCircle(raw);
  while (circle.length > 1) {
    circle.remove(circle.target);
    circle.next();
  }

  return circle.player.id;
};

const t1 = performance.now();
const sol1 = part1();
const t2 = performance.now();
console.log(`Part 1 (${Math.round((t2 - t1) * 1000) / 1000} ms)`);
console.log("  ", sol1);

const t3 = performance.now();
const sol2 = part2();
const t4 = performance.now();
console.log(`Part 2 (${Math.round((t4 - t3) * 1000) / 1000} ms)`);
console.log("  ", sol2);
