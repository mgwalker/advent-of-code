import { Point, Triangle, rotations } from "./geo.js";

const input = (raw) => {
  return raw
    .replace(/--- scanner \d+ ---\n/gs, "")
    .split("\n\n")
    .map((probes) => probes.split("\n").map((probe) => new Point(probe)));
};

const getOverlap = (
  scanner1Triangles,
  scanner2Triangles,
  overlapCount = 12,
) => {
  const overlap = new Set();

  for (const scanner1 of scanner1Triangles) {
    const matchingTriangle = scanner2Triangles.find(({ triangle }) =>
      scanner1.triangle.isSameTriangle(triangle),
    );

    if (matchingTriangle) {
      const same = scanner1.triangle.isSameTriangle(matchingTriangle.triangle);

      overlap.add(`${same[0][0].toString()} ${same[0][1].toString()}`);
      overlap.add(`${same[1][0].toString()} ${same[1][1].toString()}`);
      overlap.add(`${same[2][0].toString()} ${same[2][1].toString()}`);
    }
  }

  if (overlap.size >= overlapCount) {
    return Array.from(overlap.values())
      .slice(0, 2)
      .map((pair) => pair.split(" ").map((p) => new Point(p)));
  }
  return false;
};

const scannerLocations = new Map([[0, new Point(0, 0, 0)]]);

export const part1 = (raw) => {
  const scanners = input(raw);
  const probes = [];

  const trianglesPerScanner = [];
  scanners.forEach((scanner) => {
    const triangles = [];

    for (let i = 0; i < scanner.length; i += 1) {
      for (let j = i + 1; j < scanner.length; j += 1) {
        for (let k = j + 1; k < scanner.length; k += 1) {
          triangles.push({
            p1: i,
            p2: j,
            p3: k,
            triangle: new Triangle(scanner[i], scanner[j], scanner[k]),
          });
        }
      }
    }

    trianglesPerScanner.push(triangles);
  });

  probes.push(...scanners[0].map((p) => p.toString()));

  let toCheck = [...Array(scanners.length - 1)].map((_, i) => i + 1);

  const elapsed = performance.now();

  while (toCheck.length > 0) {
    const checking = [...toCheck];
    let overlapped = false;
    for (let i = 0; i < checking.length; i += 1) {
      const j = checking[i];

      const overlap = getOverlap(
        trianglesPerScanner[0],
        trianglesPerScanner[j],
      );

      if (overlap) {
        toCheck = toCheck.filter((v) => v !== j);
        overlapped = true;
        console.log(
          `overlap between ${0} and ${j}`.padEnd(24, " "),
          `| still need to overlap ${toCheck.length} scanners`.padEnd(35, " "),
          `| ${Math.round(performance.now() - elapsed) / 1000} s`,
        );

        const [[sourceP1, targetP1], [sourceP2, targetP2]] = overlap;

        const sourceVector = sourceP1.getVectorTo(sourceP2);

        for (const rotation of rotations()) {
          const targetP1Rotated = rotation(targetP1);
          const targetP2Rotated = rotation(targetP2);

          const targetVector = targetP1Rotated.getVectorTo(targetP2Rotated);

          if (sourceVector.isSameVector(targetVector)) {
            const dx = sourceP1.x - targetP1Rotated.x;
            const dy = sourceP1.y - targetP1Rotated.y;
            const dz = sourceP1.z - targetP1Rotated.z;

            scannerLocations.set(j, new Point(dx, dy, dz));

            for (const targetPoint of scanners[j]) {
              const rotated = rotation(targetPoint).withTranslation(dx, dy, dz);

              if (!probes.includes(rotated.toString())) {
                probes.push(rotated.toString());
                scanners[0].push(rotated);

                for (let i = 0; i < scanners[0].length; i += 1) {
                  for (let j = i + 1; j < scanners[0].length; j += 1) {
                    const p1 = scanners[0][i];
                    const p2 = scanners[0][j];

                    trianglesPerScanner[0].push({
                      p1: i,
                      p2: j,
                      p3: scanners[0].length - 1,
                      triangle: new Triangle(p1, p2, rotated),
                    });
                  }
                }
              }
            }

            // We found a rotation that works, so we can stop now.
            break;
          }
        }
      }
    }
    if (!overlapped) {
      console.log("Nothing overlapped! We're stuck in a loop. :(");
      console.log(toCheck);
      break;
    }
  }

  return probes.length;
};

export const part2 = (raw) => {
  const distances = [];
  const locations = Array.from(scannerLocations.values());

  for (let i = 0; i < locations.length; i += 1) {
    for (let j = i; j < locations.length; j += 1) {
      distances.push(locations[i].manhattanDistanceTo(locations[j]));
    }
  }

  return Math.max(...distances);
};
