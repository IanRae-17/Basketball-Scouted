import { getAvailablePlayers } from "./mapFuncitons";
import { addTrip, handleTrip } from "../slices/tripsSlice";
import { addScoutedCity, rosterPlayer } from "../slices/citiesSlice";
import {
  addContract,
  handleContract,
  handleUserContractChosen,
} from "../slices/contractsSlice";

import { changeTeamStatus } from "../slices/playersSlice";
import {
  handleCPURetractContract,
  handleUserContractNotChosen,
  handleUserContractAccepted,
} from "../slices/contractsSlice";

import store from "../store/store";

export const handleNewTrips = (trips, cities, day) => {
  // console.log("Starting to handle new trips");

  let leagueCities = cities.filter((city) => city.hasTeam && !city.userTeam);
  // - Get teams which have no active trips
  let tripsNeeded = leagueCities.filter(
    (city) =>
      !trips.some(
        (trip) => trip.team.cityID === city.cityID && !trip.isFinished
      ) && !city.userTeam
  );
  // - Start a trip for the teams who need it
  tripsNeeded.forEach((team) => {
    // console.log("Scouting trip needed for " + team.name, team);

    let availableTrips = cities.filter(
      (city) =>
        !team.scoutedCities.some(
          (scoutedCity) => scoutedCity.cityID === city.cityID
        )
    );

    let randomCityIndex = Math.floor(Math.random() * availableTrips.length);
    let randomCity = availableTrips[randomCityIndex];

    // - Add Trip
    let tripPayload = {
      team: team,
      city: randomCity,
      day: day,
    };

    // console.log("Dispatching trip payload to store");

    store.dispatch(addTrip(tripPayload));
  });
};

export const handleFinishedTrips = (trips, day) => {
  // - Filter trips that are finished
  let finishedTrips = trips.filter((trip) => trip.finishDay === day);

  // - For each trip
  for (const trip of finishedTrips) {
    // Mark trip handled
    store.dispatch(handleTrip(trip.tripID));

    // Add scouted city to teams scouted list
    let cityPayload = {
      id: trip.team.cityID,
      city: { cityID: trip.city.cityID, location: trip.city.location },
    };

    store.dispatch(addScoutedCity(cityPayload));
  }
};

export const handleFinishedContracts = (contracts, day) => {
  // - Filter finished contracts
  const finishedContracts = contracts.filter(
    (contract) => contract.finishDay === day && !contract.isHandled
  );

  // - Loop through contracts
  let handledContracts = []; // Track contracts to skip if multiple contracts for players are finished
  let playerIDs = [];
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

        playerIDs.push(chosenContract.player.playerID);

        // Handle all not chosen contracts
        samePlayerContracts.forEach((pContract) => {
          if (pContract.contractID === chosenContract.contractID) {
            if (pContract.team.userTeam) {
              // Chosen Contract User's Team
              handledContracts.push(pContract.contractID); // Local
              store.dispatch(handleContract(pContract.contractID));
              store.dispatch(handleUserContractChosen(pContract.contractID)); // State

              // Player
              store.dispatch(changeTeamStatus(contract.player.playerID));
            } else {
              // Chosen Contract CPU Team
              // Contract
              handledContracts.push(pContract.contractID); // Local
              store.dispatch(handleContract(pContract.contractID));
              store.dispatch(handleUserContractAccepted(pContract.contractID)); // State

              // Player
              store.dispatch(changeTeamStatus(pContract.player.playerID));
              // Team
              let signPayload = {
                teamID: pContract.team.cityID,
                player: pContract.player,
              };

              store.dispatch(rosterPlayer(signPayload));

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
                  store.dispatch(handleContract(tCon.contractID));
                  store.dispatch(handleCPURetractContract(tCon.contractID)); // State
                });
              }
            }
          } else {
            // Not Chosen Contract
            handledContracts.push(pContract.contractID); // Local
            store.dispatch(handleContract(pContract.contractID));
            store.dispatch(handleUserContractNotChosen(pContract.contractID)); // State
          }
        });
      }
    }
  });

  return playerIDs;
};

export const handleNewContracts = (
  contracts,
  cities,
  players,
  day,
  freshPlayerIds
) => {
  let leagueCities = cities.filter((city) => city.hasTeam && !city.userTeam);

  let filteredTeams = leagueCities.filter((team) => {
    return (
      contracts.filter(
        (contract) =>
          contract.team.cityID === team.cityID && !contract.isHandled
      ).length < 5
    );
  });

  filteredTeams.forEach((team) => {
    let neededContracts =
      3 -
      contracts.filter(
        (contract) =>
          contract.team.cityID === team.cityID && !contract.isHandled
      ).length;

    // - - Get needed positions
    let positions = Object.keys(team.roster).filter(
      (position) => team.roster[position] === null
    );

    let teamsAvailablePlayers = getAvailablePlayers(team, players);

    teamsAvailablePlayers = teamsAvailablePlayers.filter(
      (player) =>
        positions.some((pos) => pos === player.position) &&
        !freshPlayerIds.some((p) => p.playerID === player.playerID)
    );

    for (let x = 0; x < neededContracts; x++) {
      if (teamsAvailablePlayers[x]) {
        let payload = {
          team: team,
          player: teamsAvailablePlayers[x],
          day: day,
        };

        store.dispatch(addContract(payload));
      } else {
      }
    }
  });
};
