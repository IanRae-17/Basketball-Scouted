function addPlayerToRoster(roster, player) {
  const { position } = player;

  const positionChecks = {
    PG: ["PG", "SG", "SF", "PF", "C"],
    SG: ["SG", "PG", "SF", "PF", "C"],
    SF: ["SF", "SG", "PF", "PG", "C"],
    PF: ["PF", "C", "SF", "SG", "PG"],
    C: ["C", "PF", "SF", "SG", "PG"],
  };

  for (const pos of positionChecks[position]) {
    if (roster[pos] === null) {
      return { ...roster, [pos]: player };
    }
  }

  return roster;
}

export default addPlayerToRoster;
