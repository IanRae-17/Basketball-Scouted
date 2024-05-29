import { calculateDistance } from "./mapHelper";

const REFERENCE_DISTANCE = 12281; // Reference distance in miles
const REFERENCE_SCORE = 20; // Reference time in days
const RANDOM_FACTOR_MAX = 10; // Maximum random value to be added

/**
 * Calculate the score for a contract based on the distance between the team and player,
 * the team's reputation, and a random factor.
 *
 * @param {Object} team - The team offering the contract.
 * @param {Object} player - The player receiving the contract.
 * @returns {number} - The calculated score for the contract.
 */

function scoreContract(team, player) {
  console.log(team, player);
  if (!team || !player || !team.location || !player.birthplace.location) {
    throw new Error("Invalid team or player data");
  }

  const distance = calculateDistance(team.location, player.birthplace.location);

  let score = (distance * REFERENCE_SCORE) / REFERENCE_DISTANCE;
  score = Math.ceil(score);

  const randomValue = Math.floor(Math.random() * RANDOM_FACTOR_MAX) + 1;

  return score + randomValue + team.reputation;
}

export default scoreContract;
