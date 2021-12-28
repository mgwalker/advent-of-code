const input = (raw) => raw;

const dragon = (a, toLength) => {
  let out = a;
  while (out.length < toLength) {
    const b = out
      .split("")
      .reverse()
      .join("")
      .replace(/0/g, "x")
      .replace(/1/g, "0")
      .replace(/x/g, "1");

    out = `${out}0${b}`;
  }
  return out.substring(0, toLength);
};

const getChecksum = (data) => {
  const checksum = [];
  for (let i = 0; i < data.length; i += 2) {
    const pair = data.substring(i, i + 2);
    if (pair === "00" || pair === "11") {
      checksum.push("1");
    } else {
      checksum.push("0");
    }
  }

  if (checksum.length % 2 === 0) {
    return getChecksum(checksum.join(""));
  }
  return checksum.join("");
};

export const part1 = (raw) => {
  const data = dragon(input(raw), 272);
  return getChecksum(data);
};

export const part2 = (raw) => {
  const data = dragon(input(raw), 35651584);
  return getChecksum(data);
};
