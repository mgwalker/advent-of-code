const input = (raw) => {
  return raw
    .split("")
    .map((c) => parseInt(c, 16).toString("2").padStart(4, "0"))
    .join("");
};

const getReader = (data) => {
  const BITS = data.split("");
  let pointer = 0;

  const raw = (bits) => {
    const out = BITS.slice(pointer, pointer + bits).join("");
    pointer += bits;
    return out;
  };

  return {
    bitCounter: () => {
      const p = pointer;
      return () => pointer - p;
    },
    clearPadding: () => {
      const inc = 4 - (pointer % 4);
      pointer += inc;
      return inc;
    },
    int: (bits) => parseInt(raw(bits), 2),
    raw,
  };
};

const readPacket = (read, trim = true) => {
  const counter = read.bitCounter();
  const version = read.int(3);
  const type = read.int(3);

  const packet = { version, type };

  if (type === 4) {
    const literal = [];
    let bits = read.raw(5);

    while (bits[0] === "1") {
      literal.push(...bits.slice(1));
      bits = read.raw(5);
    }
    literal.push(...bits.slice(1));
    packet.literal = parseInt(literal.join(""), 2);

    if (trim) {
      read.clearPadding();
    }
  } else {
    packet.packets = [];

    const lengthType = read.int(1);
    if (lengthType === 0) {
      let subpacketSize = read.int(15);

      while (subpacketSize > 0) {
        const subpacket = readPacket(read, false);
        subpacketSize -= subpacket.bits;
        packet.packets.push(subpacket);
      }
    } else {
      let subpacketCount = read.int(11);

      while (subpacketCount > 0) {
        const subpacket = readPacket(read, false);
        packet.packets.push(subpacket);
        subpacketCount -= 1;
      }
    }
    if (trim) {
      read.clearPadding();
    }

    switch (type) {
      case 0:
        packet.literal = packet.packets.reduce(
          (sum, { literal }) => sum + literal,
          0,
        );
        break;

      case 1:
        packet.literal = packet.packets.reduce(
          (product, { literal }) => product * literal,
          1,
        );
        break;

      case 2:
        packet.literal = Math.min(
          ...packet.packets.map(({ literal }) => literal),
        );
        break;

      case 3:
        packet.literal = Math.max(
          ...packet.packets.map(({ literal }) => literal),
        );
        break;

      case 5:
        const gt = packet.packets[0].literal > packet.packets[1].literal;
        packet.literal = gt ? 1 : 0;
        break;

      case 6:
        const lt = packet.packets[0].literal < packet.packets[1].literal;
        packet.literal = lt ? 1 : 0;
        break;

      case 7:
        const eq = packet.packets[0].literal === packet.packets[1].literal;
        packet.literal = eq ? 1 : 0;
        break;
    }
  }

  packet.bits = counter();
  return packet;
};

export const part1 = (raw) => {
  const data = input(raw);
  const read = getReader(data);

  let versionSum = 0;
  const getSum = (packet) => {
    versionSum += packet.version;
    if (packet.packets) {
      for (const subpacket of packet.packets) {
        getSum(subpacket);
      }
    }
  };

  const packet = readPacket(read);
  getSum(packet);

  return versionSum;
};

export const part2 = (raw) => {
  const data = input(raw);
  const read = getReader(data);

  const packet = readPacket(read);

  return packet.literal;
};
