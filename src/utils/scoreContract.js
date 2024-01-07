import { calculateDistance } from "./mapHelper";

function scoreContract(team, player) {
  const referenceDistance = 12281; // Reference distance in miles
  const referenceScore = 20; // Reference time in days

  let score =
    (calculateDistance(team.location, player.birthplace.location) *
      referenceScore) /
    referenceDistance;
  score = Math.ceil(score);

  const randomValue = Math.floor(Math.random() * 10) + 1;

  return score + randomValue + team.reputation;
}

export default scoreContract;
