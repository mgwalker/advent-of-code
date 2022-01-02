class TuringMachine {
  #_tape = new Map();
  #_cursor = 0;
  #_state = "A";
  #_steps = 0;

  get checksum() {
    return [...this.#_tape.values()].filter((v) => v === 1).length;
  }

  *runner() {
    do {
      this.#_steps += 1;
      const current = this.#_tape.get(this.#_cursor) ?? 0;

      switch (this.#_state) {
        case "A":
          this.#_tape.set(this.#_cursor, current === 0 ? 1 : 0);
          this.#_cursor += 1;
          this.#_state = current === 0 ? "B" : "F";
          break;

        case "B":
          this.#_cursor += -1;
          this.#_state = current === 0 ? "B" : "C";
          break;

        case "C":
          this.#_tape.set(this.#_cursor, current === 0 ? 1 : 0);
          this.#_cursor += current === 0 ? -1 : 1;
          this.#_state = current === 0 ? "D" : "C";
          break;

        case "D":
          this.#_tape.set(this.#_cursor, 1);
          this.#_cursor += current === 0 ? -1 : 1;
          this.#_state = current === 0 ? "E" : "A";
          break;

        case "E":
          this.#_tape.set(this.#_cursor, current === 0 ? 1 : 0);
          this.#_cursor += -1;
          this.#_state = current === 0 ? "F" : "D";
          break;

        case "F":
        default:
          this.#_tape.set(this.#_cursor, current === 0 ? 1 : 0);
          this.#_cursor += current === 0 ? 1 : -1;
          this.#_state = current === 0 ? "A" : "E";
          break;
      }

      yield this.#_steps;
    } while (true);
  }
}

const input = () => new TuringMachine();

export const part1 = (raw) => {
  const machine = input(raw);
  const runner = machine.runner();

  for (const step of runner) {
    if (step === 12_425_180) {
      break;
    }
  }

  return machine.checksum;
};

export const part2 = (raw) => {
  const data = input(raw);
  return;
};
