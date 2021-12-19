const input = (raw) => {
  return raw
    .replace(/--- scanner \d+ ---\n/gs, "")
    .split("\n\n")
    .map((probes) =>
      probes.split("\n").map((probe) => probe.split(",").map(Number)),
    );
};

function* rotations() {
  yield ([x, y, z]) => [x, y, z];
  yield ([x, y, z]) => [x, -z, y];
  yield ([x, y, z]) => [x, -y, -z];
  yield ([x, y, z]) => [x, z, -y];

  yield ([x, y, z]) => [-y, x, z];
  yield ([x, y, z]) => [z, x, y];
  yield ([x, y, z]) => [y, x, -z];
  yield ([x, y, z]) => [-z, x, -y];

  yield ([x, y, z]) => [-x, -y, z];
  yield ([x, y, z]) => [-x, -z, -y];
  yield ([x, y, z]) => [-x, y, -z];
  yield ([x, y, z]) => [-x, z, y];

  yield ([x, y, z]) => [y, -x, z];
  yield ([x, y, z]) => [z, -x, -y];
  yield ([x, y, z]) => [-y, -x, -z];
  yield ([x, y, z]) => [-z, -x, y];

  yield ([x, y, z]) => [-z, y, x];
  yield ([x, y, z]) => [y, z, x];
  yield ([x, y, z]) => [z, -y, x];
  yield ([x, y, z]) => [-y, -z, x];

  yield ([x, y, z]) => [-z, -y, -x];
  yield ([x, y, z]) => [-y, z, -x];
  yield ([x, y, z]) => [z, y, -x];
  yield ([x, y, z]) => [y, -z, -x];
}

const getOverlap = (
  scanner1Distances,
  scanner2Distances,
  overlapCount = 12,
) => {
  const overlap = new Map();

  for (const distance of scanner1Distances) {
    const matchingTriangle = scanner2Distances.find(
      ({ p1p2, p2p3, p3p1 }) =>
        (p1p2 === distance.p1p2 &&
          p2p3 === distance.p2p3 &&
          p3p1 === distance.p3p1) ||
        (p1p2 === distance.p2p3 &&
          p2p3 === distance.p3p1 &&
          p3p1 === distance.p1p2) ||
        (p1p2 === distance.p3p1 &&
          p2p3 === distance.p1p2 &&
          p3p1 === distance.p2p3),
    );

    if (matchingTriangle) {
      const sameTriangle = { ...matchingTriangle };
      if (distance.p1p2 === sameTriangle.p1p2) {
        // Can ignore AB XY | BC YZ | CA ZX because that means everything
        // is already aligned correctly.
        // 12->12	23->23	31->31	no change
        if (distance.p2p3 === sameTriangle.p3p1) {
          // AB XY | BC ZX | CA YZ
          // 12->12	23->31	31->23	1->2, 2->1, 3->3
          const p1 = sameTriangle.p1;
          sameTriangle.p1 = sameTriangle.p2;
          sameTriangle.p2 = p1;
        } else {
        }
      } else if (distance.p1p2 === sameTriangle.p2p3) {
        // AB YZ
        if (distance.p2p3 === sameTriangle.p1p2) {
          // 12->23	23->12	31->31	1->3, 2->2, 3->1
          // AB YZ | BC XY | CA ZX
          const tmp = sameTriangle.p1;
          sameTriangle.p1 = sameTriangle.p3;
          sameTriangle.p3 = tmp;
        } else {
          // 12->23	23->31	31->12	1->2, 2->3, 3->1
          // AB YZ | BC ZX | CA XY
          const tmp = sameTriangle.p1;
          sameTriangle.p1 = sameTriangle.p2;
          sameTriangle.p2 = sameTriangle.p3;
          sameTriangle.p3 = tmp;
        }
      } else if (distance.p1p2 === sameTriangle.p3p1) {
        // AB ZX
        if (distance.p2p3 === sameTriangle.p2p3) {
          // AB ZX | BC YZ | CA XY
          // 12->31	23->23	31->12	1->1, 2->3, 3->2
          const tmp = sameTriangle.p2;
          sameTriangle.p2 = sameTriangle.p3;
          sameTriangle.p3 = tmp;
        } else {
          // AB ZX | BC XY | CA YZ
          // 12->31	23->12	31->23	1->3, 2->1, 3->2
          const tmp = sameTriangle.p1;
          sameTriangle.p1 = sameTriangle.p3;
          sameTriangle.p3 = sameTriangle.p2;
          sameTriangle.p2 = tmp;
        }
      }

      overlap.set(distance.p1, sameTriangle.p1);
      overlap.set(distance.p2, sameTriangle.p2);
      overlap.set(distance.p3, sameTriangle.p3);
    }
  }

  if (overlap.size >= overlapCount) {
    return overlap;
  }
  return false;
};

export const part1 = (raw) => {
  const scanners = input(raw);
  const probes = [];
  const scannerLocations = new Map([[0, [0, 0, 0]]]);

  const distancesPerScanner = [];
  scanners.forEach((scanner) => {
    const distances = [];

    for (let i = 0; i < scanner.length; i += 1) {
      for (let j = i + 1; j < scanner.length; j += 1) {
        for (let k = j + 1; k < scanner.length; k += 1) {
          const [x1, y1, z1] = scanner[i];
          const [x2, y2, z2] = scanner[j];
          const [x3, y3, z3] = scanner[k];
          const distance1 = Math.sqrt(
            (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2,
          );
          const distance2 = Math.sqrt(
            (x2 - x3) ** 2 + (y2 - y3) ** 2 + (z2 - z3) ** 2,
          );
          const distance3 = Math.sqrt(
            (x3 - x1) ** 2 + (y3 - y1) ** 2 + (z3 - z1) ** 2,
          );

          distances.push({
            p1: i,
            p2: j,
            p3: k,
            p1p2: distance1,
            p2p3: distance2,
            p3p1: distance3,
          });
        }
      }
    }

    distancesPerScanner.push(distances);
  });

  probes.push(...scanners[0].map((p) => p.join(",")));

  let toCheck = [...Array(scanners.length - 1)].map((_, i) => i + 1);

  const elapsed = performance.now();

  while (toCheck.length > 0) {
    const checking = [...toCheck];
    let overlapped = false;
    for (let i = 0; i < checking.length; i += 1) {
      const j = checking[i];
      const overlap = getOverlap(
        distancesPerScanner[0],
        distancesPerScanner[j],
      );

      if (overlap) {
        toCheck = toCheck.filter((v) => v !== j);
        overlapped = true;
        console.log(
          `overlap between ${0} and ${j}`.padEnd(24, " "),
          `| still need to overlap ${toCheck.length} scanners`.padEnd(35, " "),
          `| ${Math.round(performance.now() - elapsed) * 1000} s`,
        );

        const [[s0, t0], [s1, t1]] = Array.from(overlap.entries()).slice(0, 2);

        const ps0 = scanners[0][s0];
        const ps1 = scanners[0][s1];
        const vs = [ps0[0] - ps1[0], ps0[1] - ps1[1], ps0[2] - ps1[2]];

        const pt0 = scanners[j][t0];
        const pt1 = scanners[j][t1];

        for (const rotation of rotations()) {
          const ptx0 = rotation(pt0);
          const ptx1 = rotation(pt1);

          const vt = [ptx0[0] - ptx1[0], ptx0[1] - ptx1[1], ptx0[2] - ptx1[2]];
          if (vt[0] === vs[0] && vt[1] === vs[1] && vt[2] === vs[2]) {
            const dx = ps0[0] - ptx0[0];
            const dy = ps0[1] - ptx0[1];
            const dz = ps0[2] - ptx0[2];

            scannerLocations.set(j, [dx, dy, dz]);

            for (const targetPoint of scanners[j]) {
              const rotated = rotation(targetPoint);
              rotated[0] += dx;
              rotated[1] += dy;
              rotated[2] += dz;

              if (!probes.includes(rotated.join(","))) {
                probes.push(rotated.join(","));
                scanners[0].push(rotated);

                for (let i = 0; i < scanners[0].length; i += 1) {
                  for (let j = i + 1; j < scanners[0].length; j += 1) {
                    const [x1, y1, z1] = scanners[0][i];
                    const [x2, y2, z2] = scanners[0][j];
                    const [x3, y3, z3] = rotated;
                    const distance1 = Math.sqrt(
                      (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2,
                    );
                    const distance2 = Math.sqrt(
                      (x2 - x3) ** 2 + (y2 - y3) ** 2 + (z2 - z3) ** 2,
                    );
                    const distance3 = Math.sqrt(
                      (x3 - x1) ** 2 + (y3 - y1) ** 2 + (z3 - z1) ** 2,
                    );

                    distancesPerScanner[0].push({
                      p1: i,
                      p2: j,
                      p3: scanners[0].length - 1,
                      p1p2: distance1,
                      p2p3: distance2,
                      p3p1: distance3,
                    });
                  }
                }
              }
            }

            break;
          }
        }

        break;
      }
    }
    if (!overlapped) {
      console.log("Nothing overlapped! We're stuck in a loop. :(");
      console.log(toCheck);
      break;
    }
  }

  console.log(scannerLocations);

  return probes.length;
};

export const part2 = (raw) => {
  const data = input(raw);

  const sensorLocations = [
    [0, 0, 0],
    [-87, -43, -1332],
    [-1289, -102, -1326],
    [1239, -138, -1317],
    [-1221, -90, -2380],
    [1235, 1197, -1258],
    [-24, -153, -2499],
    [64, -1308, -2526],
    [61, -2459, -2392],
    [-1307, -2444, -2415],
    [-1229, -3729, -2418],
    [-2397, -2506, -2534],
    [-1150, -2506, -1240],
    [41, -2488, -3763],
    [-94, -2537, -4911],
    [-2334, -2381, -1209],
    [25, -1261, -1280],
    [1076, -1351, 12],
    [-60, -2374, -166],
    [-56, -2432, 1064],
    [-107, -1224, 1205],
    [65, -3677, -2489],
    [-27, -4783, -2437],
    [-88, -4779, -1348],
    [1210, 2233, -1330],
    [-48, -1215, -102],
  ];

  const distances = [];
  for (let i = 0; i < sensorLocations.length; i += 1) {
    const a = sensorLocations[i];
    for (let j = i; j < sensorLocations.length; j += 1) {
      const b = sensorLocations[j];
      distances.push(
        Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]),
      );
    }
  }

  return Math.max(...distances);
};
