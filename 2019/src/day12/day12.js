class Moon {
  #_position;
  #_velocity;

  constructor(x, y, z) {
    this.#_position = [x, y, z];
    this.#_velocity = [0, 0, 0];
  }

  move() {
    this.#_position[0] += this.#_velocity[0];
    this.#_position[1] += this.#_velocity[1];
    this.#_position[2] += this.#_velocity[2];
  }

  applyGravity(from) {
    for (let i = 0; i < this.#_velocity.length; i += 1) {
      const me = this.position(i);
      const them = from.position(i);

      if (me > them) {
        this.#_velocity[i] -= 1;
      } else if (me < them) {
        this.#_velocity[i] += 1;
      }
    }
  }

  distanceTo(other) {
    return this.#_position.reduce(
      (sum, v, i) => sum + Math.abs(v - other.position(i)),
      0,
    );
  }

  get energy() {
    return this.potential * this.kinetic;
  }

  get kinetic() {
    return this.#_velocity.reduce((sum, v) => sum + Math.abs(v), 0);
  }

  get potential() {
    return this.#_position.reduce((sum, v) => sum + Math.abs(v), 0);
  }

  position(i) {
    return this.#_position[i];
  }

  velocity(i) {
    return this.#_velocity[i];
  }

  print() {
    const [x, y, z] = this.#_position.map((v) => v.toString().padStart(3, " "));
    const [dx, dy, dz] = this.#_velocity.map((v) =>
      v.toString().padStart(3, " "),
    );
    console.log(
      `pos=<x=${x}, y=${y}, z=${z}>, vel=<x=${dx}, y=${dy}, z=${dz}>`,
    );
  }
}

const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((l) => {
      const [, x, y, z] = l
        .match(/^<x=(-?\d+), y=(-?\d+), z=(-?\d+)>$/)
        .map(Number);
      return new Moon(x, y, z);
    });

export const part1 = (raw) => {
  const moons = input(raw);

  for (let i = 0; i < 1000; i += 1) {
    for (const moon of moons) {
      for (const other of moons) {
        if (other !== moon) {
          moon.applyGravity(other);
        }
      }
    }

    for (const moon of moons) {
      moon.move();
    }
  }

  return moons.reduce((sum, moon) => sum + moon.energy, 0);
};

export const part2 = (raw) => {
  const moons = input(raw);

  // Find the cycles for each of X, Y, and Z. Then find the least common
  // multiple between them. That'll go a lot faster than iteration 500 trillion
  // times of planetary movements. :P

  const cycles = [0, 0, 0];
  const pTargets = [0, 1, 2].map((i) => moons.map((m) => m.position(i)));

  let steps = 0;
  while (cycles.some((v) => v === 0)) {
    steps += 1;

    for (const moon of moons) {
      for (const other of moons) {
        if (other !== moon) {
          moon.applyGravity(other);
        }
      }
    }

    for (const moon of moons) {
      moon.move();
    }

    for (const i of [0, 1, 2]) {
      if (cycles[i] === 0) {
        if (
          moons.every(
            (m, mi) => m.position(i) === pTargets[i][mi] && m.velocity(i) === 0,
          )
        ) {
          cycles[i] = steps;
        }
      }
    }
  }

  const lcm = (...numbers) => {
    const nums = [...numbers];
    const max = Math.max(...nums);

    let result = 1;
    let factor = 2;

    while (factor <= max) {
      const indices = [];
      for (let i = 0; i < nums.length; i += 1) {
        if (nums[i] % factor === 0) {
          indices.push(i);
        }
      }

      if (indices.length >= 2) {
        for (const i of indices) {
          nums[i] = Math.round(nums[i] / factor);
        }
        result *= factor;
      } else {
        factor += 1;
      }
    }

    console.log(nums);
    for (const num of nums) {
      result *= num;
    }

    return result;
  };

  return lcm(...cycles);
};
