// Distance thresholds for teams scouting range
const distanceThreshold = [300, 400, 500, 750, 900];

// Function to get the number of players in a given scouting area, generally used to estimate available players
export const getPlayersInRange = (location, players, scouting) => {
  // Distance threshold based on teams scouting

  return players.filter((player) => {
    return (
      player.isWithoutTeam &&
      calculateDistance(player.birthplace.location, location) <=
        distanceThreshold[scouting - 1]
    );
  }).length;
};

// Function to calculate distance between two points in miles
export const calculateDistance = (locationOne, locationTwo) => {
  const earthRadius = 3959; // Earth's radius in miles
  const dLat = toRadians(locationTwo.lat - locationOne.lat);
  const dLng = toRadians(locationTwo.lng - locationOne.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(locationOne.lat)) *
      Math.cos(toRadians(locationTwo.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return Math.round(distance);
};

// Function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Function to get all players all of a teams scouting area
export const getAvailablePlayers = (team, players) => {
  let allAvailablePlayers = [];

  // Get teams scouting range
  let individualThreshold = distanceThreshold[team.scouting - 1];

  // Loop through teams scoutable areas, calculate the distance from player to city
  team.scoutedCities.map((city) => {
    const tempPlayers = players.filter(
      (player) =>
        individualThreshold >=
          calculateDistance(city.location, player.birthplace.location) &&
        player.isWithoutTeam
    );

    allAvailablePlayers.push(...tempPlayers);
  });

  // Remove duplicate players based on their Player name
  const uniquePlayers = allAvailablePlayers.reduce((acc, player) => {
    if (!acc.some((p) => p.playerID === player.playerID)) {
      acc.push(player);
    }
    return acc;
  }, []);

  // Sort
  uniquePlayers.sort((a, b) => b.rating - a.rating);

  return uniquePlayers;
};
