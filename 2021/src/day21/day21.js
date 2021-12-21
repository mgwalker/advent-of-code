class Player {
  constructor(position) {
    this.position = position;
    this.score = 0;
  }

  move(spots) {
    this.position = ((this.position + spots - 1) % 10) + 1;
    this.score += this.position;
  }
}

function* deterministicDice() {
  let roll = 1;
  while (true) {
    yield roll;
    roll += 1;
    if (roll > 100) {
      roll = 1;
    }
  }
}

const input = (raw) => {
  const positions = raw
    .split("\n")
    .map((v) => v.match(/position: (\d)+$/)[1])
    .map(Number);

  return [new Player(positions[0]), new Player(positions[1])];
};

export const part1 = (raw) => {
  const players = input(raw);
  const dice = deterministicDice();

  let round = 0;
  let rolls = 0;
  while (players[0].score < 1000 && players[1].score < 1000) {
    const { value: roll1 } = dice.next();
    const { value: roll2 } = dice.next();
    const { value: roll3 } = dice.next();

    players[round % 2].move(roll1 + roll2 + roll3);

    rolls += 3;
    round += 1;
  }

  return players[round % 2].score * rolls;
};

export const part2 = (raw) => {
  const data = input(raw);

  const inc = (from, by) => ((from + by - 1) % 10) + 1;

  const games = new Map([]);

  const doABarrelRoll = (game, roll) => {
    let [rolls, p1, p2, s1, s2] = game;
    if (rolls < 3) {
      p1 = inc(p1, roll);
      if (rolls === 2) {
        // If this is the player's 3rd roll, then we update their score.
        s1 += p1;
      }
    } else {
      p2 = inc(p2, roll);
      if (rolls === 5) {
        // Same for player 2
        s2 += p2;
      }
    }
    rolls = (rolls + 1) % 6;

    return [rolls, p1, p2, s1, s2].join(",");
  };

  const playTheGame = (gameId) => {
    if (games.has(gameId)) {
      return games.get(gameId);
    }

    const game = gameId.split(",").map(Number);
    const [rolls, , , s1, s2] = game;

    // We keep track of each roll independently for simplicity's sake. Rolls 0,
    // 1, and 2 are from player 1, so if the roll number is 4, it is the end of
    // player 1's turn and we should evaluate whether they've won. Likewise for
    // player 2, roll number 0 indicates that their turn has just ended. In
    // either case, if the player won, return a "win" count.
    if (rolls === 3 && s1 >= 21) {
      return [1, 0];
    } else if (rolls === 0 && s2 >= 21) {
      return [0, 1];
    }

    const [s1a, s2a] = playTheGame(doABarrelRoll(game, 1));
    const [s1b, s2b] = playTheGame(doABarrelRoll(game, 2));
    const [s1c, s2c] = playTheGame(doABarrelRoll(game, 3));

    games.set(gameId, [s1a + s1b + s1c, s2a + s2b + s2c]);
    return games.get(gameId);
  };

  const wins = playTheGame(`0,${data[0].position},${data[1].position},0,0`);

  return Math.max(...wins);
};
