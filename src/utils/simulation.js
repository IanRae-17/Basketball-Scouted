import createTrip from "./tripHelper";
import scoreContract from "./scoreContract";
import { getAvailablePlayers } from "./mapHelper";
import { v4 as uuidv4 } from "uuid";

export function handleNewTrips(cities, trips, day) {
  // New Trips Started
  let leagueCities = cities.filter((city) => city.hasTeam && !city.userTeam);

  let tripsNeeded = leagueCities.filter(
    (city) =>
      !trips.some(
        (trip) => trip.team.cityID === city.cityID && !trip.isFinished
      ) && !city.userTeam
  );

  // Create a new array instead of modifying the existing one
  const newTrips = [...trips];

  tripsNeeded.forEach((team) => {
    let availableTrips = cities.filter(
      (city) =>
        !team.scoutedCities.some(
          (scoutedCity) => scoutedCity.cityID === city.cityID
        )
    );

    let randomCityIndex = Math.floor(Math.random() * availableTrips.length);
    let randomCity = availableTrips[randomCityIndex];

    let trip = createTrip(team, randomCity, day, newTrips);
    console.log("Adding trip: ", trip);
    newTrips.push(trip);
  });

  return newTrips;

  // New Trips Finished
}

export function handleFinishedTrips(trips, cities, day) {
  let newTrips = [...trips];
  let newCities = [...cities];

  // Finished Trips Started
  let finishedTrips = newTrips.filter((trip) => trip.finishDay === day);

  // - For each trip
  for (const trip of finishedTrips) {
    console.log("Finishing trip: ", trip);
    // Mark trip handled
    newTrips = newTrips.map((loopTrip) =>
      loopTrip.tripID === trip.tripID
        ? { ...loopTrip, isFinished: true }
        : loopTrip
    );

    // Add scouted city to teams scouted list
    let id = trip.team.cityID;
    let city = { cityID: trip.city.cityID, location: trip.city.location };

    newCities = newCities.map((currentCity) =>
      currentCity.cityID === id
        ? {
            ...currentCity,
            scoutedCities: [...currentCity.scoutedCities, city],
          }
        : currentCity
    );
  }

  return { finishedTrips: newTrips, newCities: newCities };

  // Finished Trips Finished
}

export function handleFinishedContracts(contracts, players, day, cities) {
  // Started Contracts Finished
  const finishedContracts = contracts.filter(
    (contract) => contract.finishDay === day && !contract.isHandled
  );

  let handledContracts = []; // Track contracts to skip if multiple contracts for players are finished
  let playerIds = [];

  finishedContracts.forEach((contract) => {
    if (
      !handledContracts.some((hContract) => hContract === contract.contractID) // If contract is already finished skip
    ) {
      // Get all of the contracts offered to the current contracts player
      const samePlayerContracts = contracts.filter(
        (pContract) => pContract.player.playerID === contract.player.playerID
      );

      // Choose the contract with the highest score
      if (samePlayerContracts.length > 0) {
        const chosenContract = samePlayerContracts.reduce(
          (maxScoreContract, contract) =>
            contract.score > maxScoreContract.score
              ? contract
              : maxScoreContract,
          samePlayerContracts[0]
        );

        playerIds.push(chosenContract.player.playerID);

        // Handle all not chosen contracts
        samePlayerContracts.forEach((pContract) => {
          if (pContract.contractID === chosenContract.contractID) {
            if (pContract.team.userTeam) {
              // Chosen Contract User's Team
              handledContracts.push(pContract.contractID); // Local
              contracts = contracts.map((con) =>
                con.contractID === pContract.contractID
                  ? { ...con, isHandled: true, status: "decision" }
                  : con
              );

              // Player
              players = players.map((player) =>
                player.playerID === contract.player.playerID
                  ? { ...player, isWithoutTeam: !player.isWithoutTeam }
                  : player
              );
            } else {
              // Chosen Contract CPU Team
              // Contract
              handledContracts.push(pContract.contractID); // Local
              contracts = contracts.map((con) =>
                con.contractID === pContract.contractID
                  ? { ...con, isHandled: true, status: "accepted" }
                  : con
              );

              // Player
              players = players.map((player) =>
                player.playerID === contract.player.playerID
                  ? { ...player, isWithoutTeam: !player.isWithoutTeam }
                  : player
              );
              // Team

              let teamID = pContract.team.cityID;
              let player = pContract.player;

              cities = cities.map((team) => {
                if (team.cityID === teamID) {
                  return {
                    ...team,
                    roster: {
                      ...team.roster,
                      [player.position]: player,
                    },
                  };
                } else {
                  return team;
                }
              });

              //Remove teams contracts in that position
              let otherTeamContracts = contracts.filter(
                (tContract) =>
                  tContract.team.cityID === pContract.team.cityID &&
                  pContract.player.position === tContract.player.position &&
                  pContract.player.playerID !== tContract.player.playerID
              );

              if (otherTeamContracts.length > 0) {
                otherTeamContracts.forEach((tCon) => {
                  handledContracts.push(tCon.contractID); // Local
                  contracts = contracts.map((con) =>
                    con.contractID === tCon.contractID
                      ? { ...con, isHandled: true, status: "retracted" }
                      : con
                  );
                });
              }
            }
          } else {
            // Not Chosen Contract
            handledContracts.push(pContract.contractID); // Local
            contracts = contracts.map((con) =>
              con.contractID === pContract.contractID
                ? { ...con, isHandled: true, status: "rejected" }
                : con
            );
          }
        });
      }
    }
  });

  return {
    finishedContracts: contracts,
    finishedPlayers: players,
    newerCities: cities,
    playerIds: playerIds,
  };
  // Finished Contracts Finished
}

export function handleNewContracts(cities, contracts, players, playerIds, day) {
  console.log("In Handle New Contracts");
  // New Contracts Started
  const leagueCities = cities.filter((city) => city.hasTeam && !city.userTeam);

  const filteredTeams = leagueCities.filter((team) => {
    return (
      contracts.filter(
        (contract) =>
          contract.team.cityID === team.cityID && !contract.isHandled
      ).length < 5
    );
  });

  const newContracts = [...contracts]; // Create a copy of contracts array

  filteredTeams.forEach((team) => {
    const neededContracts =
      3 -
      newContracts.filter(
        (contract) =>
          contract.team.cityID === team.cityID && !contract.isHandled
      ).length;

    // - - Get needed positions
    const positions = Object.keys(team.roster).filter(
      (position) => team.roster[position] === null
    );

    let teamsAvailablePlayers = getAvailablePlayers(team, players);

    teamsAvailablePlayers = teamsAvailablePlayers.filter(
      (player) =>
        positions.some((pos) => pos === player.position) &&
        !playerIds.some((p) => p.playerID === player.playerID)
    );

    for (let x = 0; x < neededContracts; x++) {
      if (teamsAvailablePlayers[x]) {
        const contract = {
          contractID: uuidv4(),
          team: team,
          player: teamsAvailablePlayers[x],
          finishDay: day + Math.floor(Math.random() * 8) + 3,
          score: scoreContract(team, teamsAvailablePlayers[x]),
          isHandled: false,
          status: "pending",
        };

        newContracts.push(contract);
      }
    }
  });

  // New Contracts Finished
  return newContracts;
}

export function finishSimulation(trips, cities, contracts, players, day) {
  let newTrips = handleNewTrips(cities, trips, day);
  let { finishedTrips, newCities } = handleFinishedTrips(newTrips, cities, day);
  let { finishedContracts, finishedPlayers, newerCities, playerIds } =
    handleFinishedContracts(contracts, players, day, newCities);
  let newContracts = handleNewContracts(
    newerCities,
    finishedContracts,
    finishedPlayers,
    playerIds,
    day
  );

  let leagueTeams = newerCities.filter((city) => city.hasTeam);

  if (
    leagueTeams.every(
      (team) =>
        Object.values(team.roster).filter((pos) => pos !== null).length === 5
    )
  ) {
    let unSignedPlayers = finishedPlayers.filter(
      (player) => player.isWithoutTeam
    );
    return { finishedLeague: leagueTeams, unSignedPlayers: unSignedPlayers };
  } else {
    return finishSimulation(
      finishedTrips,
      newerCities,
      newContracts,
      finishedPlayers,
      day + 1
    );
  }
}
