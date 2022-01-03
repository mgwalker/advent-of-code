import run from "aocrunner";

const parseInput = (raw) =>
  raw
    .trim()
    .split("\n\n")
    .map((v) => v.split("\n").slice(1).map(Number));

const part1 = (raw) => {
  const [p1, p2] = parseInput(raw);

  const round = () => {
    const c1 = p1.shift();
    const c2 = p2.shift();

    if (c1 > c2) {
      p1.push(c1);
      p1.push(c2);
    } else {
      p2.push(c2);
      p2.push(c1);
    }

    return p1.length === 0 || p2.length === 0;
  };

  do {} while (!round());

  const deck = p1.length > 0 ? p1 : p2;

  return deck
    .reverse()
    .map((v, i) => v * (i + 1))
    .reduce((sum, c) => sum + c, 0);
};

const part2 = (raw) => {
  const [p1, p2] = parseInput(raw);
  let winningDeck;

  const game = (player1deck, player2deck) => {
    const seen1 = new Set();
    const seen2 = new Set();

    const round = () => {
      if (
        seen1.has(player1deck.join(",")) &&
        seen2.has(player2deck.join(","))
      ) {
        winningDeck = player1deck;
        return false;
      }

      seen1.add(player1deck.join(","));
      seen2.add(player2deck.join(","));

      const c1 = player1deck.shift();
      const c2 = player2deck.shift();

      let roundWinner;
      if (player1deck.length >= c1 && player2deck.length >= c2) {
        roundWinner = game(player1deck.slice(0, c1), player2deck.slice(0, c2));
      } else {
        roundWinner = c1 > c2 ? 1 : 2;
      }

      if (roundWinner === 1) {
        player1deck.push(c1);
        player1deck.push(c2);
        winningDeck = player1deck;
        roundWinner = 1;
      } else {
        player2deck.push(c2);
        player2deck.push(c1);
        winningDeck = player2deck;
        roundWinner = 2;
      }

      if (player1deck.length === 0) {
        return false;
      }
      if (player2deck.length === 0) {
        return false;
      }

      return true;
    };

    do {} while (round() !== false);

    return player1deck.length > 0 ? 1 : 2;
  };

  game(p1, p2);

  return winningDeck
    .reverse()
    .map((v, i) => v * (i + 1))
    .reduce((sum, c) => sum + c, 0);
};

run({
  part1: { solution: part1 },
  part2: { solution: part2 },
  trimTestInputs: true,
});
