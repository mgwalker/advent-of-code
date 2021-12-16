import { config } from "dotenv";
import fs from "fs/promises";
import fetch from "node-fetch";
import setTimeout from "timers/promises";

config();
const AOC_KEY = process.env.AOC_SESSION_KEY;

const aoc = JSON.parse(await fs.readFile(".aocrunner.json"));

await Promise.all(
  aoc.days
    .filter(({ part1: { solved: p1 }, part2: { solved: p2 } }) => p1 || p2)
    .map(async ({ part1, part2 }, i) => {
      if (part1.readme && part2.readme) {
        return;
      }
      const day = i + 1;

      const response = await fetch(`https://adventofcode.com/2021/day/${day}`, {
        headers: {
          Cookie: `session=${AOC_KEY}`,
        },
      });
      const txt = await response.text();

      const parts = txt
        .match(/<article.*>[\s\S]+?<\/article>/gim)
        .map((p) => p.replace(/<em.*>([^<]*)<\/em>/gm, "<strong>$1</strong>"));

      const readme = `# 🎄 Advent of Code 2021 - day ${day} 🎄
[Original problem](https://adventofcode.com/2021/day/${day})

${parts.join("\n\n")}
`;
      await fs.writeFile(
        `src/day${`${day}`.padStart(2, "0")}/README.md`,
        readme,
      );

      if (parts.length === 2) {
        part1.readme = true;
        part2.readme = true;
      } else if (parts.length > 0) {
        part1.readme = true;
      }
    }),
);

await fs.writeFile(".aocrunner.json", JSON.stringify(aoc, null, 2));
