const input = (raw) => {
  const carts = [];

  const tracks = raw.split("\n").map((line, y) =>
    line.split("").map((v, x) => {
      if (v === " ") {
        return false;
      }

      if (v === "v") {
        carts.push([x, y, "down"]);
        return "|";
      }
      if (v === "^") {
        carts.push([x, y, "up"]);
        return "|";
      }
      if (v === ">") {
        carts.push([x, y, "right"]);
        return "-";
      }
      if (v === "<") {
        carts.push([x, y, "left"]);
        return "-";
      }

      return v;
    })
  );

  return {
    carts: carts.map(([x, y, direction], i) => ({
      id: i,
      x,
      y,
      direction,
      turns: 0,
    })),
    tracks,
  };
};

const cartSort = ({ x: xa, y: ya }, { x: xb, y: yb }) => {
  if (ya === yb) {
    return xa - xb;
  }
  return ya - yb;
};

export const part1 = (raw) => {
  const { carts, tracks } = input(raw);

  let collided = false;
  do {
    carts.sort(cartSort);
    for (const cart of carts) {
      switch (cart.direction) {
        case "up":
          cart.y -= 1;
          break;

        case "down":
          cart.y += 1;
          break;

        case "left":
          cart.x -= 1;
          break;

        case "right":
          cart.x += 1;
          break;

        default:
          throw new Error(`unknown direction ${cart.direction}`);
      }

      const tile = tracks[cart.y][cart.x];
      switch (tile) {
        case "/":
          switch (cart.direction) {
            case "up":
              cart.direction = "right";
              break;

            case "down":
              cart.direction = "left";
              break;

            case "left":
              cart.direction = "down";
              break;

            case "right":
            default:
              cart.direction = "up";
              break;
          }
          break;

        case "\\":
          switch (cart.direction) {
            case "up":
              cart.direction = "left";
              break;

            case "down":
              cart.direction = "right";
              break;

            case "left":
              cart.direction = "up";
              break;

            case "right":
            default:
              cart.direction = "down";
              break;
          }
          break;

        case "+":
          switch (cart.turns % 3) {
            case 0: // turn left
              switch (cart.direction) {
                case "up":
                  cart.direction = "left";
                  break;

                case "down":
                  cart.direction = "right";
                  break;

                case "left":
                  cart.direction = "down";
                  break;

                case "right":
                default:
                  cart.direction = "up";
                  break;
              }
              break;

            case 2: // go right
              switch (cart.direction) {
                case "up":
                  cart.direction = "right";
                  break;

                case "down":
                  cart.direction = "left";
                  break;

                case "left":
                  cart.direction = "up";
                  break;

                case "right":
                default:
                  cart.direction = "down";
                  break;
              }
              break;

            case 1: // go straight (do nothing)
            default:
              break;
          }
          cart.turns += 1;
          break;

        default:
          // do nothing for straight track
          break;
      }

      if (
        carts.some((c) => c.x === cart.x && c.y === cart.y && c.id !== cart.id)
      ) {
        collided = [cart.x, cart.y];
        break;
      }
    }
  } while (collided === false);

  return collided.join(",");
};

export const part2 = (raw) => {
  const { carts, tracks } = input(raw);

  do {
    carts.sort(cartSort);

    for (let i = 0; i < carts.length; i += 1) {
      const cart = carts[i];

      switch (cart.direction) {
        case "up":
          cart.y -= 1;
          break;

        case "down":
          cart.y += 1;
          break;

        case "left":
          cart.x -= 1;
          break;

        case "right":
          cart.x += 1;
          break;

        default:
          throw new Error(`unknown direction ${cart.direction}`);
      }

      const tile = tracks[cart.y][cart.x];
      switch (tile) {
        case "/":
          switch (cart.direction) {
            case "up":
              cart.direction = "right";
              break;

            case "down":
              cart.direction = "left";
              break;

            case "left":
              cart.direction = "down";
              break;

            case "right":
            default:
              cart.direction = "up";
              break;
          }
          break;

        case "\\":
          switch (cart.direction) {
            case "up":
              cart.direction = "left";
              break;

            case "down":
              cart.direction = "right";
              break;

            case "left":
              cart.direction = "up";
              break;

            case "right":
            default:
              cart.direction = "down";
              break;
          }
          break;

        case "+":
          switch (cart.turns % 3) {
            case 0: // turn left
              switch (cart.direction) {
                case "up":
                  cart.direction = "left";
                  break;

                case "down":
                  cart.direction = "right";
                  break;

                case "left":
                  cart.direction = "down";
                  break;

                case "right":
                default:
                  cart.direction = "up";
                  break;
              }
              break;

            case 2: // go right
              switch (cart.direction) {
                case "up":
                  cart.direction = "right";
                  break;

                case "down":
                  cart.direction = "left";
                  break;

                case "left":
                  cart.direction = "up";
                  break;

                case "right":
                default:
                  cart.direction = "down";
                  break;
              }
              break;

            case 1: // go straight (do nothing)
            default:
              break;
          }
          cart.turns += 1;
          break;

        default:
          // do nothing for straight track
          break;
      }

      const other = carts.findIndex(
        (c) => c.x === cart.x && c.y === cart.y && c.id !== cart.id
      );
      if (other >= 0) {
        if (i > other) {
          carts.splice(i, 1);
          carts.splice(other, 1);
          i -= 2;
        } else {
          carts.splice(other, 1);
          carts.splice(i, 1);
          i -= 1;
        }
      }
    }
  } while (carts.length > 1);

  // 73,36
  return `${carts[0].x},${carts[0].y}`;
};
