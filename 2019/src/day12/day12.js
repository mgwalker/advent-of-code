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

  get state() {
    return `<${this.#_position.join(",")}|${this.#_velocity.join(",")}>`;
  }

  position(i) {
    return this.#_position[i];
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
  const states = new Map();

  const state = () => {
    return moons.map((m) => m.state).join(",");

    // return moons
    //   .map((m) => {
    //     const distances = [];
    //     for (const other of moons) {
    //       distances.push(m.distanceTo(other));
    //     }
    //     return distances.join(",");
    //   })
    //   .join("|");
  };

  // Brute force could work, for intense amounts of memory to store the billions
  // of unique states. Instead, maybe something about their positions and
  // velocities relative to each other. Or maybe the positions/velocities are
  // ordered by value or something. That seems like it would only work if all
  // the moons' p/vs are rotated in the same ways, though, not just arbitrarily.
  //
  // Can you derive v as a function of t, and then p as a second-order function
  // of t, perhaps? v(t) would include p(t-1) in its equations, so... not sure.
  //
  // v1(t) = v(t-1) + [p2(t-1) - p1(t-1)]/|p2(t-1) - p1(t-1)| (...etc for moons)
  // p1(t) = p1(t-1) + v1(t)

  let steps = 0;
  while (!states.has(state()) && steps < 10_000) {
    if (steps < 10) {
      console.log(state());
    }
    states.set(state(), steps);
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
  }

  console.log("===");
  console.log(steps);
  console.log(state());
  console.log(states.get(state()));

  // for (let i = 0; i < 10; i += 1) {
  //   steps += 1;

  //   for (const moon of moons) {
  //     for (const other of moons) {
  //       if (other !== moon) {
  //         moon.applyGravity(other);
  //       }
  //     }
  //   }

  //   for (const moon of moons) {
  //     moon.move();
  //   }
  //   console.log(state());
  // }

  return steps;
};
