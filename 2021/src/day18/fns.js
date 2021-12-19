// If there is any [left,right] pair that is contained within 4 parent pairs,
// "explode" it. If there are any numbers left of this pair, add the right-most
// to the left pair value. If there are any numbers right of this pair, add
// the left-most to the right pair value. Then, replace the [left, right] pair
// with a 0. E.g.:
// input:   [3,[[[[4,2],1]]]]
// becomes: [7,[[[0,3]]]]
//
// [4,2] is the exploding pair. The 4 is the left number and gets added to the
// 3, which is the right-most number to the left. Likewise, the 2 is the right
// number and gets added to the left-most number to its right which is 1.
// Finally, the [4,2] gets replaced with 0.
//
// If there are no numbers to the left, the left pair value disappears. Likewise
// for the right pair value if there are no numbers to the right. E.g.:
// input:   [[[[[[[[4,9]]]]]]]]
// becomes: [[[[[[[0]]]]]]]
const explode = (str) => {
  let depth = 0;
  let index = -1;

  // We look for the first pair that's inside four other pairs, which we can
  // find by counting unmatched open brackets. When we find a fifth one, that
  // marks the start of a pair that's inside 4 other ones.
  while (depth < 5 && index < str.length) {
    index += 1;
    if (str[index] === "[") {
      depth += 1;
    } else if (str[index] === "]") {
      depth -= 1;
    }
  }
  // Now advance up to the first digit of the pair. It could actually be several
  // more levels down, but snail math is conducted LEFT first, not DEPTH first.
  while (str[index] === "[") {
    index += 1;
  }

  // If we've exhausted the string and haven't reached a pair inside four other
  // pairs, we don't need to explode, so let's bail out.
  if (depth < 5) {
    return [false, str];
  }

  // This is the index of the closing bracket of the pair that needs to be
  // exploded. We're gonna need to know where this is.
  const closer = str.indexOf("]", index);

  // Get the left and right numbers in the exploding pair.
  const [left, right] = str
    .substr(index, closer - index)
    .split(",")
    .map((v) => v.replace(/\D/g, ""))
    .map(Number);

  // These are the substrings that come before and after the exploding pair. We
  // stop the "before" one character early, to account for the opening bracket.
  // Same with the "after" substring
  let before = str.substr(0, index - 1);
  let after = str.substr(closer + 1);

  // This is where we'll collect the substrings of the exploded value.
  const output = [];

  // If the before substring contains any digits, then that means there's a
  // left-side number that needs to be added to.
  if (/\d/.test(before)) {
    // Find the right-most numbers in the "before" substring.
    const [match, lefter] = before.match(/(\d+)\D*$/);

    // This is the part of the "before" substring that comes after the
    // right-most number. (I know this is getting weird.)
    const afterBefore = before.substr(
      before.length - match.length + lefter.length,
    );

    // And now we shorten the "before" substring so it's only the part that
    // comes before the right-most number.
    before = before.substr(0, before.length - match.length);

    // Now mush the "before" parts together into the output. When computing the
    // sum of the left pair and the right-most number from "before," be sure to
    // convert the "before" number from a string to a number.
    output.push(before);
    output.push(`${+lefter + left},`);
    output.push(afterBefore);
  } else {
    // If there is not a number before the exploding pair, then the "before"
    // is kept entirely intact.
    output.push(before);
  }

  // Now that we've handled the "before," we can handle the pair - we replace
  // the exploding pair with just 0.
  output.push("0");

  // And then we follow the same patter for the "after" part of the string.
  if (/\d/.test(after)) {
    const [match, righter] = after.match(/\D*?(\d+)/);
    const afterAfter = after.substr(match.length);
    after = after.substr(0, match.length - righter.length);
    output.push(after);
    output.push(`,${+righter + right}`);
    output.push(afterAfter);
  } else {
    output.push(after);
  }

  // And finally... because the string parsing can sometimes result in commas
  // next to each other, or extraneous leading or trailing commas before or
  // after a bracket, so let's yoink those out.
  return [
    true,
    output.join("").replace(/,+/g, ",").replace("[,", "[").replace(",]", "]"),
  ];
};

// If there are any numbers in the string greater than 10, split them into a new
// pair. The new pair is [floor(number/2), ceiling(number/2)].
const split = (str) => {
  // Simply, we find where a two-digit number begins. If there's not one, we can
  // happily bail out early.
  const { index } = str.match(/\d{2}/) ?? [];
  if (!index) {
    return [false, str];
  }

  // The number to split begins at the index and is two characters long. Nice
  // and easy. And we can conveniently go ahead and convert it to a number.
  const splitNumber = +str.substr(index, 2);

  // Now compute the left and right values.
  const l = Math.floor(splitNumber / 2);
  const r = Math.ceil(splitNumber / 2);

  // And mush it all together: before the big number, the new pair made from the
  // big number, and after the big number.
  const out = [];
  out.push(str.substr(0, index));
  out.push("[", l, ",", r, "]");
  out.push(str.substr(index + 2));

  return [true, out.join("")];
};

// Compute the magnitude of a snailfish number. This is computed as:
//   3 * left + 2 * right
// It is computed recursively, so if left or right are also pairs, their
// magnitudes are computed first. And so on and so on, until we get to a pair
// that's just numbers, not more pairs. Snailfish math is super weird.
export const magnitude = (snailfishNumber) => {
  const [leftSide, rightSide] = snailfishNumber;

  return (
    3 * (Array.isArray(leftSide) ? magnitude(leftSide) : leftSide) +
    2 * (Array.isArray(rightSide) ? magnitude(rightSide) : rightSide)
  );
};

// Reduce a snailfish number. Reducing a number means following kind of this
// algorithm:
// 1. check if pairs should explode
// 2. if so, explode the first pair and return to step 1
// 3. check if pairs should be split
// 4. if so, split the first pair and return to step 1
// 5. if no pairs should explode or split, you're done!
export const reduce = (snailfishNumber) => {
  let go = true;

  while (go) {
    [go, snailfishNumber] = explode(snailfishNumber);
    if (!go) {
      [go, snailfishNumber] = split(snailfishNumber);
    }
  }
  return snailfishNumber;
};
