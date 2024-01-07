function calculateScoutTime(distance) {
  const referenceDistance = 9935; // Reference distance in miles
  const referenceTime = 20; // Reference time in days

  const time = (distance * referenceTime) / referenceDistance;
  return Math.ceil(time);
}

export default calculateScoutTime;
