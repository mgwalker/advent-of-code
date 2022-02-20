function* range(n) {
  for (let i = 0; i < n; i += 1) {
    yield i;
  }
}

const reduceSum = (sum, v) => sum + v;

export { range, reduceSum };
