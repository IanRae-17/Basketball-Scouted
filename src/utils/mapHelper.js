import { v4 as uuidv4 } from "uuid";

export const getClusterSpread = (zoom) => {
  if (zoom <= 2) {
    return 80;
  } else if (zoom <= 4) {
    return 50;
  } else if (zoom <= 6) {
    return 30;
  } else if (zoom <= 8) {
    return 15;
  }
};

export const createClusters = (markers, clusterRadius) => {
  const clusters = [];

  markers.forEach((marker) => {
    let closestCluster = null;
    let minDistance = clusterRadius;

    // Find the closest cluster
    clusters.forEach((cluster) => {
      const distance = calculateDistance(cluster.location, marker.location);

      if (distance < minDistance) {
        closestCluster = cluster;
        minDistance = distance;
      }
    });

    // If a close cluster is found, add the marker to it
    if (closestCluster !== null) {
      closestCluster.data.push({ item: marker.data, type: marker.type });
      closestCluster.types.add(marker.type);
    } else {
      // If no close cluster is found, create a new cluster
      clusters.push({
        id: uuidv4(),
        location: marker.location,
        data: [{ item: marker.data, type: marker.type }],
        types: new Set([marker.type]),
      });
    }
  });

  return clusters;
};

const getIconUrl = (type, color) => {
  return `https://api.geoapify.com/v1/icon/?type=awesome&color=%23${color}&size=xx-large&icon=${type}&iconSize=small&scaleFactor=2&apiKey=f024929880ba424190cf0d097173aad1`;
};

const getCircleIconUrl = (type, color) => {
  return `https://api.geoapify.com/v1/icon/?type=circle&color=%23${color}&size=xx-large&icon=${type}&iconType=awesome&iconSize=small&scaleFactor=2&apiKey=f024929880ba424190cf0d097173aad1`;
};

function getScaledSize(zoom, x, y) {
  if (zoom <= 2) {
    return new window.google.maps.Size(x, y);
  } else if (zoom <= 4) {
    return new window.google.maps.Size(2 * x, 2 * y);
  } else if (zoom <= 6) {
    return new window.google.maps.Size(3 * x, 3 * y);
  } else if (zoom <= 8) {
    return new window.google.maps.Size(4 * x, 4 * y);
  }
}

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

export const calculateClusterIcon = (cluster, zoom) => {
  let color = "ffffff";
  let iconType = "";
  let scaledSize = getScaledSize(zoom, 15.5, 20.5);
  let circledScaledSize = getScaledSize(zoom, 20.5, 20.5);

  if (cluster.types.size > 1) {
    // Cluster has multiple types in it, use the bag icon
    iconType = "layer-group";
  } else {
    // Cluster only has one type
    let [type] = [...cluster.types];

    switch (type) {
      case "player":
        iconType = cluster.data.length > 1 ? "users" : "user";
        break;
      case "team":
        iconType = "home";
        break;
      case "trip":
        iconType = "plane";
        break;
      default:
        break;
    }
  }

  return {
    url:
      cluster.types.size > 1
        ? getCircleIconUrl(iconType, "18453b")
        : getIconUrl(iconType, color),

    scaledSize: cluster.types.size > 1 ? circledScaledSize : scaledSize,
  };
};
