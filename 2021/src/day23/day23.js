const input = (raw) => {
  const letters = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
  };

  const toads = raw
    .split("\n")
    .slice(2, 4)
    .map((s) =>
      s
        .trim()
        .replace(/#/g, "")
        .split("")
        .map((l) => letters[l]),
    );

  const hallway = [...Array(11)].map((_, i) =>
    i > 0 && i < 10 && i % 2 === 0 ? null : false,
  );

  const rooms = [];
  for (let i = 0; i < toads[0].length; i += 1) {
    const room = [];
    for (let j = 0; j < toads.length; j += 1) {
      room.push(toads[j][i]);
    }
    rooms.push(room);
  }

  return { hallway, rooms };
};

const stateCosts = new Map();
let minimumCost = Infinity;

const getStateKey = ({ hallway, rooms }) => hallway + "|" + rooms;

const play = (state) => {
  if (state.cost > minimumCost) {
    return;
  }

  const { cost, hallway, rooms } = JSON.parse(JSON.stringify(state));
  const stateKey = getStateKey({ hallway, rooms });

  const won = rooms.every((room, i) => room.every((toad) => toad === i));
  if (won) {
    if (cost < minimumCost) {
      minimumCost = cost;
    }
    return;
  }

  if ((stateCosts.get(stateKey) ?? Infinity) <= cost) {
    return;
  }
  stateCosts.set(stateKey, cost);

  // Now figure out all the possible moves from this point.

  // If the hallway is empty, then the possible moves are each of the topmost
  // toads moving to each spot in the hallway.
  if (hallway.every((v) => v === false || v === null)) {
    for (let hallSpot = 0; hallSpot < hallway.length; hallSpot += 1) {
      if (hallway[hallSpot] === null) {
        // This is not a spot you can move into, so skip it.
        continue;
      }
      for (let room = 0; room < rooms.length; room += 1) {
        const newRooms = JSON.parse(JSON.stringify(rooms));
        const newHall = [...hallway];

        newHall[hallSpot] = newRooms[room][0];
        newRooms[room][0] = false;

        // This is the hallway column that the toad's room opens onto. Also
        // add one to the cost to account for the toad moving out of the room
        // and into the hallway.
        const toadSpot = room * 2 + 2;
        const newCost =
          (1 + Math.abs(toadSpot - hallSpot)) * 10 ** rooms[room][0];

        play({ cost: cost + newCost, hallway: newHall, rooms: newRooms });
      }
    }
  } else {
    // Next see if any toad can go home.
    for (let hallSpot = 0; hallSpot < hallway.length; hallSpot += 1) {
      if (hallway[hallSpot] === null || hallway[hallSpot] === false) {
        // This is not a stoppable spot, or nobody's in it.
        continue;
      }

      const toad = hallway[hallSpot];

      // If its home room is empty or only occupied by the same kind of toad,
      // we're good to go.
      if (rooms[toad].every((t) => t === toad || t === false)) {
        // This is the hallway column the toad needs to get to in order to
        // reach its room.
        const homeSpot = toad * 2 + 2;

        let allClear = false;
        if (homeSpot > hallSpot) {
          const ahead = hallway.slice(hallSpot + 1, homeSpot);
          if (ahead.every((spot) => spot === false || spot === null)) {
            // The way forward is clear. This toad can go home.
            allClear = true;
          }
        } else {
          const behind = hallway.slice(homeSpot, hallSpot);
          if (behind.every((spot) => spot === false || spot === null)) {
            // The way back is clear. This toad can go home.
            allClear = true;
          }
        }

        if (allClear) {
          const roomIndex =
            rooms[toad].filter((spot) => spot === false).length - 1;

          const newHallway = [...hallway];
          const newRooms = JSON.parse(JSON.stringify(rooms));

          newHallway[hallSpot] = false;
          newRooms[toad][roomIndex] = toad;

          const newCost =
            (Math.abs(hallSpot - homeSpot) +
              rooms[toad].filter((t) => t === false).length) *
            10 ** toad;

          play({
            cost: cost + newCost,
            hallway: newHallway,
            rooms: newRooms,
          });
        }
      }
    }

    // Otherwise, all the toads at the tops of their rooms can try all of the
    // available hall spots that they can get to.
    for (let room = 0; room < rooms.length; room += 1) {
      // If all of the creatures in this room live here, from bottom up, we
      // can skip this one, too.
      if (rooms[room].every((t) => t === room || t === false)) {
        continue;
      }

      const depth = rooms[room].filter((t) => t === false).length;
      const toadSpot = room * 2 + 2;

      if (depth === rooms[0].length) {
        // This room is empty, so no toads can move out of it.
        continue;
      }

      const tryHallspot = (hallSpot) => {
        const newHallway = [...hallway];
        const newRooms = JSON.parse(JSON.stringify(rooms));

        newHallway[hallSpot] = rooms[room][depth];
        newRooms[room][depth] = false;

        const newCost =
          (depth + 1 + Math.abs(toadSpot - hallSpot)) *
          10 ** rooms[room][depth];

        play({ cost: cost + newCost, hallway: newHallway, rooms: newRooms });
      };

      for (let hallSpot = toadSpot - 1; hallSpot >= 0; hallSpot -= 1) {
        if (hallway[hallSpot] === null) {
          // Unoccupiable
          continue;
        }
        if (hallway[hallSpot] !== false) {
          // Occupied. The toad can't go here, and it can't go beyond this
          // spot, either.
          break;
        }

        tryHallspot(hallSpot);
      }

      for (
        let hallSpot = toadSpot + 1;
        hallSpot < hallway.length;
        hallSpot += 1
      ) {
        if (hallway[hallSpot] === null) {
          // Unoccupiable
          continue;
        }
        if (hallway[hallSpot] !== false) {
          // Occupied. The toad can't go here, and it can't go beyond this
          // spot, either.
          break;
        }

        tryHallspot(hallSpot);
      }
    }
  }
};

export const part1 = (raw) => {
  stateCosts.clear();
  minimumCost = Infinity;
  const state = { cost: 0, ...input(raw) };

  play(state);

  return minimumCost;
};

export const part2 = (raw) => {
  stateCosts.clear();
  minimumCost = Infinity;
  const state = { cost: 0, ...input(raw) };

  state.rooms[0] = [state.rooms[0][0], 3, 3, state.rooms[0][1]];
  state.rooms[1] = [state.rooms[1][0], 2, 1, state.rooms[1][1]];
  state.rooms[2] = [state.rooms[2][0], 1, 0, state.rooms[2][1]];
  state.rooms[3] = [state.rooms[3][0], 0, 2, state.rooms[3][1]];

  play(state);

  return minimumCost;
};
