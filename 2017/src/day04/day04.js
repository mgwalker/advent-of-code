const input = (raw) =>
  raw
    .trim()
    .split("\n")
    .map((v) => v.split(" "));

export const part1 = (raw) => {
  const data = input(raw);

  return data.filter((words) => {
    const unique = new Set();
    for (const word of words) {
      if (unique.has(word)) {
        return false;
      }
      unique.add(word);
    }
    return true;
  }).length;
};

const isAnagram = (word1, word2) => {
  if (word1.length === word2.length) {
    const w1 = new Set([...word1.split("")]);
    return word2.split("").every((w2) => w1.has(w2));
  }
  return false;
};

export const part2 = (raw) => {
  const data = input(raw);

  return data.filter((words) => {
    for (let i = 0; i < words.length; i += 1) {
      for (let j = i + 1; j < words.length; j += 1) {
        if (isAnagram(words[i], words[j])) {
          return false;
        }
      }
    }
    return true;
  }).length;
};
