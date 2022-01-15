const input = (raw) => {
  const columns = 25;
  const rows = 6;

  const layers = [];
  let offset = 0;

  while (offset < raw.length) {
    const pixels = [];
    const flatPixels = raw.trim().split("").map(Number);

    for (let i = 0; i < rows; i += 1) {
      const row = flatPixels.slice(
        i * columns + offset,
        (i + 1) * columns + offset,
      );
      pixels.push(row);
    }

    offset += columns * rows;
    layers.push(pixels);
  }

  return layers;
};

export const part1 = (raw) => {
  const layers = input(raw).map((layer) => layer.flat());

  const zeroes = layers
    .map((layer) => [layer.filter((v) => v === 0).length, layer])
    .sort(([a], [b]) => a - b);

  const target = zeroes[0][1];
  const ones = target.filter((v) => v === 1).length;
  const twos = target.filter((v) => v === 2).length;

  return ones * twos;
};

export const part2 = (raw) => {
  const layers = input(raw);

  const image = [];
  for (let y = 0; y < layers[0].length; y += 1) {
    const row = [];
    for (let x = 0; x < layers[0][0].length; x += 1) {
      const p = layers.map((l) => l[y][x]).filter((v) => v !== 2);
      row.push(p[0]);
    }
    image.push(row);
  }

  return image
    .map((row) => row.map((v) => (v === 0 ? " " : "█")).join(""))
    .join("\n");
};
