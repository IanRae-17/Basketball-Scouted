import { calculateDistance } from "./mapHelper";
import { v4 as uuidv4 } from "uuid";

export default function createTrip(team, city, day, trips) {
  let distance = calculateDistance(team.location, city.location);
  let timeToScout = calculateScoutTime(distance);

  let trip = {
    tripID: uuidv4(),
    team: team,
    city: city,
    distance: distance,
    timeToScout: timeToScout,
    finishDay: timeToScout + getLargestFinishDay(trips, team, day),
    isFinished: false,
  };

  return trip;
}

function getLargestFinishDay(trips, team, day) {
  const tripsForCity = trips.filter((trip) => trip.team.cityID === team.cityID);

  if (tripsForCity.length > 0) {
    const largestFinishDay = tripsForCity.reduce((maxFinishDay, trip) => {
      return Math.max(maxFinishDay, trip.finishDay);
    }, -1);

    return largestFinishDay;
  } else {
    // Return a different value if no trips exist for the city
    return day; // or any other value you prefer
  }
}

export function calculateScoutTime(distance) {
  const referenceDistance = 9935; // Reference distance in miles
  const referenceTime = 20; // Reference time in days

  const time = (distance * referenceTime) / referenceDistance;
  return Math.ceil(time);
}
