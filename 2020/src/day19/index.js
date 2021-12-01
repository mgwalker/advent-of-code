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

  const createRegexString = (ruleNumber) => {
    const rule = rules.get(ruleNumber);

    if (rule === "a" || rule === "b") {
      return rule;
    }

    return ` ( ${rule
      .split("|")
      .map((v) => v.trim())
      .map((orRule) =>
        orRule
          .split(" ")
          .map((v) => v.trim())
          .map((andRule) => createRegexString(andRule))
          .join(" "),
      )
      .join(" | ")} ) `;
  };
  const regex = new RegExp(`^${createRegexString("0").replace(/ /g, "")}$`);
  return messages.filter((m) => regex.test(m)).length;
};

const part2 = (rawInput) => {
  const { rules, messages } = parseInput(rawInput);

  const createRegexString = (ruleNumber) => {
    const rule = rules.get(ruleNumber);

    if (rule === "a" || rule === "b") {
      return rule;
    }

    // Rule 11 becomes special case. It resolves to any one of:
    //
    //    42 31
    //    42 42 31 31
    //    42 42 42 31 31 31
    //    42 42 42 42 31 31 31 31
    //
    // ...and so on. So build up a set of matches accordingly.
    if (ruleNumber === "11") {
      const fortytwo = createRegexString("42");
      const thirtyone = createRegexString("31");

      // This is a haaaaaaaack. Limit the recursion to a depth of 10 because
      // otherwise it's too many captures and the RegEx engine barfs.
      const all = [...Array(10)].map((_, num) => {
        const one = [];
        const two = [];
        for (let i = 0; i <= num; i += 1) {
          one.push(fortytwo);
          two.push(thirtyone);
        }
        return `${one.join("")}${two.join("")}`;
      });

      return ` ( ${all.join(" | ")} )`;
    }

    return ` ( ${rule
      .split("|")
      .map((v) => v.trim())
      .map((orRule) =>
        orRule
          .split(" ")
          .map((v) => v.trim())
          .map((andRule) => createRegexString(andRule))
          .join(" "),
      )
      // Rule 8 is also a special case, but it's just the same match repeated
      // one or more times, which we can handle by just adding a +.
      .join(" | ")} )${ruleNumber === "8" ? "+" : ""} `;
  };
  const regex = new RegExp(`^${createRegexString("0").replace(/ /g, "")}$`);
  return messages.filter((m) => regex.test(m)).length;
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
