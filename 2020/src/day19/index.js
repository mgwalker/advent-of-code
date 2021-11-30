import run from "aocrunner";

const parseInput = (rawInput) => {
  const [rules, messages] = rawInput.split("\n\n");
  const ruleMap = new Map();
  rules.split("\n").forEach((ruleDefinition) => {
    const [number, rule] = ruleDefinition.split(": ");
    ruleMap.set(number, rule.replace(/[^a-z0-9 |]/gi, ""));
  });
  return { rules: ruleMap, messages: messages.split("\n") };
};

const part1 = (rawInput) => {
  const { rules, messages } = parseInput(rawInput);
  for (const [key, value] of rules) {
    if (value === "a" || value === "b") {
      rules.set(key, (str) => {
        if (str.startsWith(value)) {
          return [true, value];
        } else {
          return [false];
        }
      });
    } else {
      rules.set(key, (str) => {
        const oneOf = value.split(" | ").map((v) => v.trim());

        for (const or of oneOf) {
          let localStr = str;
          let substr = [];

          const parts = or.split(" ").map((v) => v.trim());
          for (const part of parts) {
            const [pass, match] = rules.get(part)(localStr);
            if (pass) {
              localStr = localStr.substr(match.length);
              substr.push(match);
            } else {
              // We can stop examining this side of the OR if any part fails
              substr.length = 0;
              break;
            }
          }

          // If this side of the OR has a matching substring, we don't need
          // to check the other side.
          if (substr.length > 0) {
            return [true, substr.join("")];
          }
        }

        return [false, str];
      });
    }
  }

  const matches = messages.map((message) => {
    const [pass, match] = rules.get("0")(message);
    if (match === message) {
      return pass;
    }
    return false;
  });

  return matches.filter((pass) => pass).length;
};

const part2 = (rawInput) => {
  const { rules, messages } = parseInput(rawInput);

  rules.set("8", "42 | 42 8");
  rules.set("11", "42 31 | 42 11 31");

  for (const [key, value] of rules) {
    rules.set(key, (str, prefix = "") => {
      console.log(`${prefix}RULE ${key}: ${str}`);
      if (value === "a" || value === "b") {
        if (str.startsWith(value)) {
          console.log(`${prefix}  (${key}) true | ${value}`);
          return [true, value];
        } else {
          console.log(`${prefix}  (${key}) false`);
          return [false];
        }
      }

      const oneOf = value.split(" | ").map((v) => v.trim());

      for (const or of oneOf) {
        let localStr = str;
        let substr = [];

        const parts = or.split(" ").map((v) => v.trim());
        for (const part of parts) {
          const [pass, match] = rules.get(part)(localStr, `${prefix}  `);
          if (pass) {
            localStr = localStr.substr(match.length);
            substr.push(match);
          } else {
            // We can stop examining this side of the OR if any part fails
            substr.length = 0;
            break;
          }
        }

        // If this side of the OR has a matching substring, we don't need
        // to check the other side.
        if (substr.length > 0) {
          console.log(`${prefix}  (${key}) true | ${substr.join("")}`);
          return [true, substr.join("")];
        }
      }

      console.log(`${prefix}  (${key}) ${false}`);
      return [false, str];
    });
  }

  const matches = messages.map((message) => {
    const [pass, match] = rules.get("0")(message);
    if (match === message) {
      return pass;
    }
    return false;
  });

  return matches.filter((pass) => pass).length;
};

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
  trimTestInputs: true,
});
