function swapPositions(roster, pos1, pos2) {
  let tempPlayer = roster[pos1];

  return (roster = { ...roster, [pos1]: roster[pos2], [pos2]: tempPlayer });
}

export default swapPositions;
