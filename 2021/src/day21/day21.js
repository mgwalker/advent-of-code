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
  const inc = (from, by) => ((from + by - 1) % 10) + 1;

  const games = new Map([]);

  const doABarrelRoll = (game, roll) => {
    let [rolls, p1, p2, s1, s2] = game;

    // Player 1's rolls are 0, 1, and 2
    if (rolls < 3) {
      p1 = inc(p1, roll);

      // If this is the player's last roll of their turn, then we can increment
      // their score. Don't increment every time!
      if (rolls === 2) {
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

    // After this roll, we have created a new universe, so return its associated
    // game ID.
    return [rolls, p1, p2, s1, s2].join(",");
  };

  // A game ID is the string (without spaces, of course):
  //   roll, p1 position, p2 position, p1 score, p2 score
  // It represents a distinct universe. Playing a universe takes it from its
  // current state and plays it until someone wins it. Playing a universe means
  // spawning more universes, so this thingy is recursive.
  const playTheGame = (gameId) => {
    // If we've already established the score that results from this universe,
    // we can stop and return that. No need to run it all again.
    if (games.has(gameId)) {
      return games.get(gameId);
    }

    const game = gameId.split(",").map(Number);
    const [turn, , , s1, s2] = game;

    // We keep track of each roll independently, since each one spawns a new
    // "universe." This means rolls 0, 1, and 2 are by player 1, and rolls 3,
    // 4, and 5 are by player 2. Thus, if we're about to run roll 3, we've just
    // finished player 1's turn and should check if they've won. Likewise for
    // player turn and roll 0. If we're here and the player won, it's the first
    // time they've ever won on this universe, so return a score array.
    if (turn === 3 && s1 >= 21) {
      return [1, 0];
    } else if (turn === 0 && s2 >= 21) {
      return [0, 1];
    }

    // Spawn off new universes for the three possible outcomes of this roll.
    // Grab the scores that we get back from each universe.
    const descendantScore = [1, 2, 3]
      .map((roll) => playTheGame(doABarrelRoll(game, roll)))
      .reduce(
        ([sum1, sum2], [score1, score2]) => [sum1 + score1, sum2 + score2],
        [0, 0],
      );

    // The preceding three universes represent the three universes that are
    // spawned from this one. The score of THIS universe, therefore, is the
    // sum of the scores of those universes.
    games.set(gameId, descendantScore);

    // Return our universe's score.
    return games.get(gameId);
  };

  const [player1, player2] = input(raw);
  const wins = playTheGame(`0,${player1.position},${player2.position},0,0`);

  return Math.max(...wins);
};
