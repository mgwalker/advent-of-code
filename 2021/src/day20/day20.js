const input = (raw) => {
  const [algorithm, data] = raw.split("\n\n");
  return {
    algorithm: algorithm.split(""),
    data: data.split("\n").map((line) => line.split("")),
  };
};

const getNeighborValue = (data, x, y, blank) => {
  // The easy assumption is that if a pixel isn't represented in our view of
  // the image, then it must be dark. And that's true in the first iteration,
  // per the instructions. HOWEVER! After the first iteration, the hidden pixels
  // will be the value of the first algorithm instruction. So, we need to let
  // the blank pixel value be configurable.

  const neighbors = [];
  for (let yi = -1; yi <= 1; yi += 1) {
    const yy = y + yi;
    for (let xi = -1; xi <= 1; xi += 1) {
      const xx = x + xi;

      if (xx < 0 || yy < 0 || yy >= data.length || xx >= data[yy].length) {
        neighbors.push(blank);
      } else {
        neighbors.push(data[yy][xx]);
      }
    }
  }
  return parseInt(neighbors.map((v) => (v === "." ? "0" : "1")).join(""), 2);
};

const enhance = (algorithm, data, iteration) => {
  // It's silly but we need to track the iteration count in order to know what
  // the blank pixel is. For the sake of my brain being able to keep it all
  // straight, the iteration is ONE-BASED, not zero-based.

  const img = [];

  const blank = (() => {
    // If the first rule of the algorithm is #, then the unseen infinite pixels
    // will all be lit after the first iteration. If the first rule is #, then
    // the last rule MUST BE . in order to not create an actually-infninite
    // image. Anyway,this is how we decide the state of all the infinite pixels
    // for each step.
    if (algorithm[0] === "#") {
      if (iteration % 2 === 0) {
        return "#";
      } else {
        return ".";
      }
    }
    return ".";
  })();

  // Expand the bounds of our output image to account for previously-hidden
  // pixels that get toggled by virtue of being in proximity to visible ones.
  for (let y = -1; y < data.length + 1; y += 1) {
    const row = [];
    for (let x = -1; x < data[0].length + 1; x += 1) {
      const algIndex = getNeighborValue(data, x, y, blank);
      row.push(algorithm[algIndex]);
    }
    img.push(row);
  }
  return img;
};

export const part1 = (raw) => {
  const { algorithm, data } = input(raw);

  let img = data;
  for (let i = 0; i < 2; i += 1) {
    img = enhance(algorithm, img, i + 1);
  }

  return img.flat().filter((v) => v === "#").length;
};

export const part2 = (raw) => {
  const { algorithm, data } = input(raw);

  let img = data;
  for (let i = 0; i < 50; i += 1) {
    img = enhance(algorithm, img, i + 1);
  }

  return img.flat().filter((v) => v === "#").length;
};
