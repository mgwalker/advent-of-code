export default (ops) => {
  for (let ip = 0; ip < ops.length; ip += 4) {
    const [op, a, b, out] = ops.slice(ip, ip + 4);
    switch (op) {
      case 1:
        ops[out] = ops[a] + ops[b];
        break;

      case 2:
        ops[out] = ops[a] * ops[b];
        break;

      case 99:
        return;

      default:
        throw new Error(`Unknown op code: ${op}`);
    }
  }
};
