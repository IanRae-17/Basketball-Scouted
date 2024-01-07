// React
import { useState, useEffect, useMemo } from "react";

// Assets
import BBALLIMAGE from "./assets/BBALL.png";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sidebarData } from "./assets/explainer";
import { getAvailablePlayers } from "./utils/mapHelper";

// Components
import ExplainerBox from "./components/ExplainerBox";
import PlayerList from "./components/PlayerList";
import ContractList from "./components/ContractList";
import Map from "./components/Map";
import ScoutingList from "./components/ScoutingList";
import TeamList from "./components/TeamList";
import InfoBox from "./components/InfoBox";

// Redux
import { connect } from "react-redux";
import useUserTeam from "./hooks/useUserTeam";
import { stepDay } from "./slices/simulationSlice";
import FinishSimulation from "./components/FinishSimulation";
import {
  handleFinishedContracts,
  handleFinishedTrips,
  handleNewContracts,
  handleNewTrips,
  finishSimulation,
} from "./utils/simulation";
import { setCities } from "./slices/citiesSlice";
import { setContracts } from "./slices/contractsSlice";
import { setTrips } from "./slices/tripsSlice";
import { setPlayers } from "./slices/playersSlice";

function App({
  cities,
  players,
  contracts,
  trips,
  activeCluster,
  simulation,
  stepDay,
  setCities,
  setTrips,
  setContracts,
  setPlayers,
}) {
  const [sideBarStatus, setSideBarStatus] = useState(
    new Array(sidebarData.length).fill(false)
  );
  const [finalPagePayload, setFinalPagePayload] = useState(null);

  const [finished, setFinished] = useState(false);

  const team = useUserTeam();

  const leagueTeams = useMemo(() => {
    return cities.filter((city) => city.hasTeam);
  }, [cities]);

  const availablePlayers = useMemo(() => {
    if (team && players) {
      return getAvailablePlayers(team, players);
    }
  }, [players]);

  const shortListedPlayers = useMemo(() => {
    return availablePlayers.filter((player) => player.isShortListed);
  }, [availablePlayers]);

  function renderSideBarContent(type) {
    switch (type) {
      case "Available Players":
        return <PlayerList players={availablePlayers} team={team} />;
      case "Short List":
        return <PlayerList players={shortListedPlayers} team={team} />;
      case "Current Contracts":
        return <ContractList team={team} />;
      case "Scouting Trips":
        return <ScoutingList team={team} day={simulation.day} />;
      case "Team":
        return <TeamList team={team} />;
      default:
        return <></>;
    }
  }

  function handleSimulateDay() {
    if (simulation.day > 0 && !finished) {
      let newTrips = handleNewTrips(cities, trips, simulation.day);

      let { finishedTrips, newCities } = handleFinishedTrips(
        newTrips,
        cities,
        simulation.day
      );

      let { finishedContracts, finishedPlayers, newerCities, playerIds } =
        handleFinishedContracts(contracts, players, simulation.day, newCities);

      let newContracts = handleNewContracts(
        newerCities,
        finishedContracts,
        finishedPlayers,
        playerIds,
        simulation.day
      );

      setTrips(finishedTrips);
      setCities(newerCities);
      setContracts(newContracts);
      setPlayers(finishedPlayers);
    }
  }

  function handleFinishSimulation() {
    setFinished(true);
    setFinalPagePayload(
      finishSimulation(trips, cities, contracts, players, simulation.day)
    );
  }

  useEffect(() => {
    handleSimulateDay();
  }, [simulation.day]);

  if (finished) {
    return (
      <>
        {finalPagePayload ? (
          <FinishSimulation
            unSignedPlayers={finalPagePayload.unSignedPlayers}
            finishedLeague={finalPagePayload.finishedLeague}
          />
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }

  return (
    <div className="grid-container">
      <div className="grid-submit-button button-wrapper">
        {Object.values(team.roster).filter((pos) => pos !== null).length ===
        5 ? (
          <button className="button" onClick={() => handleFinishSimulation()}>
            Finish Simulation
          </button>
        ) : (
          <button className="button" onClick={() => stepDay()}>
            Simulate Day
          </button>
        )}
      </div>
      <div className="grid-sidebar sidebar">
        <div className="sidebar-wrapper">
          {sidebarData.map((item, idx) => {
            return (
              <>
                <div
                  className="sidebar-item-closed"
                  onClick={() =>
                    setSideBarStatus((prevStatus) =>
                      prevStatus.map((status, i) =>
                        i === idx ? !status : status
                      )
                    )
                  }
                  key={item.title}
                >
                  <h3>{item.title}</h3>
                  <div>
                    <FontAwesomeIcon
                      icon={sideBarStatus[idx] ? faChevronUp : faChevronDown}
                    />
                  </div>
                </div>
                <div
                  className={
                    sideBarStatus[idx]
                      ? "sidebar-item-opened"
                      : "sidebar-item-open"
                  }
                >
                  <ExplainerBox info={item.info} />
                  {renderSideBarContent(item.title)}
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="grid-corner corner">
        <img src={BBALLIMAGE} />
        <h1>scouted</h1>
      </div>

      {availablePlayers && (
        <Map players={availablePlayers} league={leagueTeams} />
      )}

      <div className="grid-header header">
        {team.name + ", " + team.defaultTeamName}
      </div>
      <div className="grid-map-sub-header sub-header"></div>
      {activeCluster && <InfoBox activeCluster={activeCluster} />}
      <div className="grid-right-corner header-counter">
        <h1>{"Day: " + simulation.day}</h1>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    players: state.players,
    contracts: state.contracts,
    trips: state.trips,
    activeCluster: state.activeCluster,
    simulation: state.simulation,
  };
};

const mapDispatchToProps = {
  stepDay,
  setCities,
  setTrips,
  setContracts,
  setPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
