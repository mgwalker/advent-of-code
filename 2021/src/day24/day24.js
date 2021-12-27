const input = (raw) => {
  const lines = raw.split("\n");

  const parts = [];
  while (lines.length > 0) {
    // The integer values from lines 5, 6, and 16 of each set of instructions
    // are the only ones that matter, so we can toss everything else out.
    const inst = lines.splice(0, 18);
    const a = +inst[4].split(" ")[2];
    const b = +inst[5].split(" ")[2];
    const c = +inst[15].split(" ")[2];
    parts.push({ a, b, c });
  }

  return parts;
};

const doIt = (parts) => {
  const digits = [...Array(14)];
  const nums = [];

  for (let i = 0; i < parts.length; i += 1) {
    const { a, b, c } = parts[i];
    if (a === 1) {
      // If the Z divisor is 1, then this digit's Z value is the previous Z
      // value multiplied by 26, and then some new number added. Notably, the
      // new number added is less than 26, which is important when doing integer
      // division by 26 later, because it turns into zero.
      //
      // The only value that's important here is the value added to w at the
      // very end, so stash that off along with which digit we're looking at.
      nums.push([i, c]);
    } else {
      // If the Z divisor is 26, that's when we get constraints about the
      // inputs. The division steps are in equal number to the multiplication
      // step, so the only way to get to zero at the end is if they all balance
      // out. As a result, we are constrained here to the condition that results
      // in the division, not another multiplication.
      //
      // In order to force the division, we must satisfy the x = w condition on
      // the 7th line. And here's the first place the "less than 26" observation
      // above comes in handy. x has been set to, initially, the previous z,
      // which is [something] * 26 + [something less than 26]. Something times a
      // number and then modulo that same number is always zero, so we're just
      // left with the [something less than 26]. x, therefore, is essentially
      // the previous digit + the value in its 16th line - which just happens
      // to have been stashed off in our stack above.
      //
      // Let c0 and w0, be the values from the previous instruction. Then:
      //
      //   x = w0 + c0 + b
      //
      // And thus, we're looking for a w = w0 + c0 + b. b0 is always negative
      // when we're in this divisor step (thankfully!). Also remember that w
      // values are constrained to between 1 and 9. So w0 can be anywhere from
      // 1 to 9, and thinking about that entire range of previous ws, then:
      //
      //   if c0 + b is negative, then the lowerbound for the current digit is
      //   1. We can see there are cases where that is valid; e.g. w0 is 2 and
      //   c0 + b is -1; or 2 and -3; or 4 and -3, etc.). The upperbound for the
      //   current digit is 9 minus c0 + b. If the current digit is greater than
      //   that, then it cannot equal w0 + c0 + b because c0 + b is negative.
      //   E.g., if c0 + b is -2 and the current digit is 9, there is no value
      //   of w0 that satisfie 9 = w0 - 2.
      //
      //   If c0 + b is positive, then the lowerbound for the current digit is
      //   1 + c0 + b, by the same logic as the upperbound from above, and the
      //   upperbound is 9.
      //
      // We can similarly derive the upper and lowerbounds of w0. And that's it.
      // All the rest of the math is just a distraction.

      const [neighbor, neighborC] = nums.pop();
      const diff = neighborC + b;

      if (diff < 0) {
        digits[neighbor] = { min: 1 - diff, max: 9 };
        digits[i] = { min: 1, max: 9 + diff };
      } else {
        digits[neighbor] = { min: 1, max: 9 - diff };
        digits[i] = { min: 1 + diff, max: 9 };
      }
    }
  }

  return digits;
};

export const part1 = (raw) => {
  const digitParts = input(raw);
  return +doIt(digitParts)
    .map(({ max }) => max)
    .join("");
};

export const part2 = (raw) => {
  const digitParts = input(raw);
  return +doIt(digitParts)
    .map(({ min }) => min)
    .join("");
};
