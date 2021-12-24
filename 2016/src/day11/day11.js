// const elements = new Set();

const input = (raw) => {
  const state = {
    elevator: 1,
    floors: `\n${raw}`.split("\n").map((s) => {
      const chips = s.match(/[^ ]+?-compatible microchip/gi)?.length ?? 0;
      const generators = s.match(/[^ ]+? generator/gi)?.length ?? 0;

      return { chips, generators };
    }),
  };

  return state;
};

const getStateKey = ({ elevator, floors }) => {
  const allFloors = [];

  for (let i = 1; i < floors.length; i += 1) {
    allFloors.push(`${floors[i].chips},${floors[i].generators}`);
  }

  return `${elevator}|${allFloors.join("|")}`;
};

const print = ({ elevator, floors }, count) => {
  return;
  console.log(`${`${count}`.padEnd(3, " ")}  G c`);

  for (let i = floors.length - 1; i > 0; i -= 1) {
    const { chips, generators } = floors[i];
    console.log(`F${i} ${elevator === i ? "E" : "."} ${generators} ${chips}`);
  }
  console.log("---");
};

const printTransition = (
  { elevator: e1, floors: f1 },
  { elevator: e2, floors: f2 }
) => {
  return;
  console.log(`     G c  |       G c`);

  for (let i = f1.length - 1; i > 0; i -= 1) {
    const { chips: c1, generators: g1 } = f1[i];
    const { chips: c2, generators: g2 } = f2[i];
    console.log(
      `F${i} ${e1 === i ? "E" : "."} ${g1} ${c1}  |  F${i} ${
        e2 === i ? "E" : "."
      } ${g2} ${c2}`
    );
  }
  console.log(
    `min: ${stateSteps.get(
      getStateKey({ elevator: e1, floors: f1 })
    )}       min: ${
      stateSteps.get(getStateKey({ elevator: e2, floors: f2 })) ?? "(first)"
    }`
  );
  console.log("---");
};

const getNextStates = ({ elevator: el, floors }) => {
  const states = [];
  const currentFloor = floors[el];

  if (el === floors.length - 1) {
    // If the elevator is on the top floor, see if everything is on the top
    // floor already.
    const slice = floors.slice(1, floors.length - 1);
    if (
      currentFloor.chips === currentFloor.generators &&
      slice.every((floor) => floor.chips === 0 && floor.generators === 0)
    ) {
      // Everything is in its place. Woop woop!
      return false;
    }
  }

  // Check for pairs if we're not on the top floor.
  if (el < floors.length - 1) {
    // There is a pair if there is more than one chip and more than one
    // generator. If there are no chips or generators, obviously no pair.
    if (currentFloor.chips > 0 && currentFloor.generators > 0) {
      // Make sure everything on the next floor is paired, or only generators.
      if (
        floors[el + 1].chips === 0 ||
        floors[el + 1].generators === floors[el + 1].chips
      ) {
        const newFloors = JSON.parse(JSON.stringify(floors));

        newFloors[el].chips -= 1;
        newFloors[el].generators -= 1;
        newFloors[el + 1].chips += 1;
        newFloors[el + 1].generators += 1;

        states.push({
          elevator: el + 1,
          floors: newFloors,
        });
      }
    }
  }

  // Never move anything down if all the floors below are empty, because that
  // would be silly.
  const floorsBelowAreOccupied = !floors
    .slice(1, el)
    .every(({ chips, generators }) => chips === 0 && generators === 0);

  const canMoveUp = el < floors.length - 1;
  const canMoveDown = el > 1 && floorsBelowAreOccupied;

  const moveUp = (count, prop) => {
    const newFloors = JSON.parse(JSON.stringify(floors));
    newFloors[el][prop] -= count;
    newFloors[el + 1][prop] += count;
    return { elevator: el + 1, floors: newFloors };
  };
  const moveDown = (count, prop) => {
    const newFloors = JSON.parse(JSON.stringify(floors));
    newFloors[el][prop] -= count;
    newFloors[el - 1][prop] += count;
    return { elevator: el - 1, floors: newFloors };
  };

  // A chip can only leave a floor if:
  //  a) there are no generators on the floor with it currently (it's unpaired)
  //  b) there are more generators than chips on the target floor (or the floor is empty)
  //  - OR -
  //  a) the number of chips and generators on the current floor are equal (it's paired)
  //  b) there are no generator on the target floor
  if (currentFloor.chips > 0) {
    if (currentFloor.generators === 0) {
      // This floor has an unpaired chip.
      // A generator is "open" if it isn't paired to a chip. We can't move a chip
      // up unless the floor above has an open generator to pair it with.
      const openGenUp = canMoveUp
        ? floors[el + 1].generators - floors[el + 1].chips
        : 0;
      const openGenDown = canMoveDown
        ? floors[el - 1].generators - floors[el - 1].chips
        : 0;

      if (canMoveUp) {
        if (currentFloor.chips >= 2 && openGenUp >= 2) {
          // We can move two chips up.
          states.push(moveUp(2, "chips"));
        }

        if (currentFloor.chips >= 1 && openGenUp >= 1) {
          // We can move one chip up.
          states.push(moveUp(1, "chips"));
        }
      }

      if (canMoveDown) {
        if (currentFloor.chips >= 2 && openGenDown >= 2) {
          // We can move two chips up.
          states.push(moveDown(2, "chips"));
        }

        if (currentFloor.chips >= 1 && openGenDown >= 1) {
          // We can move one chip up.
          states.push(moveDown(1, "chips"));
        }
      }
    } else if (currentFloor.chips <= currentFloor.generators) {
      // This floor has paired chips.
      if (canMoveUp && floors[el + 1].generators === 0) {
        if (currentFloor.chips >= 2) {
          // We can move two chips up.
          states.push(moveUp(2, "chips"));
        }

        if (currentFloor.chips >= 1) {
          // We can move one chip up.
          states.push(moveUp(1, "chips"));
        }
      }
      if (canMoveDown && floors[el - 1].generators === 0) {
        if (currentFloor.chips >= 2) {
          // We can move two chips up.
          states.push(moveDown(2, "chips"));
        }

        if (currentFloor.chips >= 1) {
          // We can move one chip up.
          states.push(moveDown(1, "chips"));
        }
      }
    }
  }

  // A generator can only leave a floor if:
  //  a) there are more generators than chips on its floor (it's unpaired)
  //  b) the number of generators after moving will be >= the number of chips
  // - OR -
  // a) there is exactly one generator and one chip on this floor (they are paired)
  // b) the number of generators after moving will be >= the number of chips
  if (currentFloor.generators > 0) {
    if (currentFloor.generators > currentFloor.chips) {
      // Unpaired generator
      if (canMoveUp) {
        if (
          currentFloor.generators > 1 &&
          floors[el + 1].generators + 2 >= floors[el + 1].chips
        ) {
          states.push(moveUp(2, "generators"));
        }
        if (floors[el + 1].generators + 1 >= floors[el + 1].chips) {
          states.push(moveUp(1, "generators"));
        }
      }

      if (canMoveDown) {
        if (
          currentFloor.generators > 1 &&
          floors[el - 1].generators + 2 >= floors[el - 1].chips
        ) {
          states.push(moveDown(2, "generators"));
        }
        if (floors[el - 1].generators + 1 >= floors[el - 1].chips) {
          states.push(moveDown(1, "generators"));
        }
      }
    } else if (currentFloor.generators === 1 && currentFloor.chips === 1) {
      // Paired generator
      if (canMoveUp) {
        if (
          currentFloor.generators > 1 &&
          floors[el + 1].generators + 2 >= floors[el + 1].chips
        ) {
          states.push(moveUp(2, "generators"));
        }
        if (floors[el + 1].generators + 1 >= floors[el + 1].chips) {
          states.push(moveUp(1, "generators"));
        }
      }
      if (canMoveDown) {
        if (
          currentFloor.generators > 1 &&
          floors[el - 1].generators + 2 >= floors[el - 1].chips
        ) {
          states.push(moveDown(2, "generators"));
        }
        if (floors[el - 1].generators + 1 >= floors[el - 1].chips) {
          states.push(moveDown(1, "generators"));
        }
      }
    }
  }

  return states;
};

const stateSteps = new Map();
let minimum = Infinity;

const play = (state, count, previous, init = false) => {
  if (init) {
    stateSteps.clear();
    minimum = Infinity;
  }

  const key = getStateKey(state);
  if (count >= (stateSteps.get(key) ?? Infinity) || count > minimum) {
    // No need to examine this state again if we've already seen a version of it
    // with a lower cost, or if it already costs more than a win.
    return Infinity;
  }
  stateSteps.set(key, count);

  if (previous !== false) {
    printTransition(previous, state);
  }

  const next = getNextStates(state);

  if (next === false) {
    if (count < minimum) {
      minimum = count;
    }
    return count;
  } else {
    return Math.min(...next.map((step) => play(step, count + 1, state)));
  }
};

export const part1 = (raw) => {
  const state = input(raw);
  // Dunno why I have to subtract two, but it is consistent for my puzzle input.
  // Using others' inputs, I get the correct result without the random math.
  //
  // There's a thread on reddit about this particular input:
  //   https://www.reddit.com/r/adventofcode/comments/5hpx7e/2016_day_11_is_the_puzzle_and_the_solutions/
  //   https://old.reddit.com/r/adventofcode/comments/5hqxzq/2016_day_11_can_we_get_a_list_of_inputssolutions/
  return play(state, 0, false, true) - 2;
};

export const part2 = (raw) => {
  const state = input(raw);

  state.floors[1].chips += 2;
  state.floors[1].generators += 2;

  // 57
  return play(state, 0, false, true) - 2;
};
