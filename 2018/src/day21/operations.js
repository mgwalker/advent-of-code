export const addi = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] + bi;
  return out;
};

export const addr = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] + registers[bi];
  return out;
};

export const bani = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] & bi;
  return out;
};

export const banr = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] & registers[bi];
  return out;
};

export const bori = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] | bi;
  return out;
};

export const borr = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] | registers[bi];
  return out;
};

export const eqir = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = ai === registers[bi] ? 1 : 0;
  return out;
};

export const eqri = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] === bi ? 1 : 0;
  return out;
};

export const eqrr = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] === registers[bi] ? 1 : 0;
  return out;
};

export const gtir = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = ai > registers[bi] ? 1 : 0;
  return out;
};

export const gtri = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] > bi ? 1 : 0;
  return out;
};

export const gtrr = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] > registers[bi] ? 1 : 0;
  return out;
};

export const muli = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] * bi;
  return out;
};

export const mulr = ([, ai, bi, ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai] * registers[bi];
  return out;
};

export const seti = ([, ai, , ci], registers) => {
  const out = [...registers];
  out[ci] = ai;
  return out;
};

export const setr = ([, ai, , ci], registers) => {
  const out = [...registers];
  out[ci] = registers[ai];
  return out;
};
