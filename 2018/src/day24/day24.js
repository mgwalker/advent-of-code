const input = (raw) => {
  const [immune, infection] = raw
    .trim()
    .split("\n\n")
    .map((v) => v.split("\n").slice(1))
    .map((units, i) =>
      units.map((unitStr, j) => {
        const [, count, hp, attack, type, initiative] = unitStr.match(
          /^(\d+) units each with (\d+) hit points.* with an attack that does (\d+) (\S+) damage at initiative (\d+)$/
        );
        const unit = {
          id: `${i === 0 ? "b-cell" : "germ"},${j + 1}`,
          attack: +attack,
          count: +count,
          hp: +hp,
          immune: [],
          initiative: +initiative,
          kind: i === 0 ? "immune" : "infection",
          type,
          weak: [],
        };

        const [, modifiers] = unitStr.match(/\(([^)]+)\)/) ?? [];
        if (modifiers) {
          const kinds = modifiers.split("; ");
          for (const kind of kinds) {
            const [, weakOrImmune, types] = kind.match(/^(\S+) to (.+)$/);
            types.split(", ").forEach((modifiedType) => {
              unit[weakOrImmune].push(modifiedType);
            });
          }
        }

        return unit;
      })
    );

  return [immune, infection].flat();
};

const ep = (unit) => unit.count * unit.attack;
const armySort = (a, b) => {
  const ea = ep(a);
  const eb = ep(b);

  if (ea === eb) {
    return b.initiative - a.initiative;
  }
  return eb - ea;
};

const runTheWar = (initialArmies) => {
  const armies = JSON.parse(JSON.stringify(initialArmies));

  const getDamage = (attacker, defender) => {
    let boom = ep(attacker);
    if (defender.immune.includes(attacker.type)) {
      boom = 0;
    }
    if (defender.weak.includes(attacker.type)) {
      boom *= 2;
    }
    return boom;
  };

  do {
    armies.sort(armySort);

    // Target acquisition
    const targeted = new Set();
    const targets = [];
    for (const army of armies) {
      let targetDamage = 0;
      let target = false;

      for (const potential of armies.filter(({ kind }) => kind !== army.kind)) {
        if (!targeted.has(potential.id)) {
          const damage = getDamage(army, potential);

          if (damage > targetDamage) {
            target = potential;
            targetDamage = damage;
          } else if (damage === target.boom) {
            const epp = ep(potential);
            const ept = ep(target);

            if (epp > ept) {
              target = potential;
              targetDamage = damage;
            } else if (epp === ept) {
              if (potential.initiative > target.initiative) {
                target = potential;
                targetDamage = damage;
              }
            }
          }
        }
      }

      if (target) {
        targets.push([army, target]);
        targeted.add(target.id);
      }
    }

    // Boomy boom
    const eliminated = new Set();
    targets.sort(([{ initiative: a }], [{ initiative: b }]) => b - a);
    for (const [attacker, defender] of targets) {
      const damage = getDamage(attacker, defender);

      const killed = Math.min(Math.floor(damage / defender.hp), defender.count);

      defender.count -= killed;
      if (defender.count <= 0) {
        eliminated.add(defender.id);
      }
    }

    for (let i = 0; i < armies.length; i += 1) {
      if (eliminated.has(armies[i].id)) {
        armies.splice(i, 1);
        i -= 1;
      }
    }

    if (armies.length === 2) {
      if (
        getDamage(armies[0], armies[1]) < armies[1].hp &&
        getDamage(armies[1], armies[0]) < armies[0].hp
      ) {
        return [false];
      }
    }
  } while (new Set(armies.map(({ kind }) => kind)).size > 1);

  return armies;
};

export const part1 = (raw) => {
  const armies = input(raw);
  return runTheWar(armies).reduce((sum, { count }) => sum + count, 0);
};

export const part2 = (raw) => {
  const armies = input(raw);

  let survivors = runTheWar(armies);

  while (survivors.every(({ kind }) => kind === "immune") === false) {
    for (const army of armies) {
      if (army.kind === "immune") {
        army.attack += 1;
      }
    }

    survivors = runTheWar(armies);
  }

  return survivors.reduce((sum, { count }) => sum + count, 0);
};
