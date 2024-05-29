import { useDispatch, useSelector } from "react-redux";
import { incrementDay, setFinished } from "../slices/simulationSlice";
import { setTrips } from "../slices/tripsSlice";
import { setCities } from "../slices/citiesSlice";
import { setContracts } from "../slices/contractsSlice";
import { setPlayers } from "../slices/playersSlice";
import {
  handleNewTrips,
  handleFinishedTrips,
  handleFinishedContracts,
  handleNewContracts,
} from "../utils/simulationHelper";
import { useMemo } from "react";
import { finishSimulation } from "../utils/simulationHelper";
import { Navigate, useNavigate } from "react-router-dom";

const DayCounter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const day = useSelector((state) => state.simulation.day);
  const trips = useSelector((state) => state.trips);
  const cities = useSelector((state) => state.cities);
  const contracts = useSelector((state) => state.contracts);
  const players = useSelector((state) => state.players);

  const userTeam = useMemo(() => {
    return cities.filter((city) => city.userTeam)[0];
  }, [cities]);

  const handleSimDay = () => {
    const newDay = day + 1;
    dispatch(incrementDay());

    let newTrips = handleNewTrips(cities, trips, newDay);

    let { finishedTrips, newCities } = handleFinishedTrips(
      newTrips,
      cities,
      newDay
    );

    let { finishedContracts, finishedPlayers, newerCities, playerIds } =
      handleFinishedContracts(contracts, players, newDay, newCities);
    let newContracts = handleNewContracts(
      newerCities,
      finishedContracts,
      finishedPlayers,
      playerIds,
      newDay
    );

    dispatch(setTrips(finishedTrips));
    dispatch(setCities(newerCities));
    dispatch(setContracts(newContracts));
    dispatch(setPlayers(finishedPlayers));
  };

  const handleFinishSimulation = () => {
    console.log("Step One");
    const payload = finishSimulation(trips, cities, contracts, players, day);
    console.log("Step Two");
    dispatch(setCities(payload.finishedLeague));
    console.log("Step Three");
    navigate("/finish");
    console.log("Step Four");
  };

  return (
    <div className="flex justify-end items-center gap-4 text-white px-8 py-4 container mx-auto max-w-screen-lg">
      <span className="text-lg font-bold px-4 py-2">Day: {day}</span>
      {Object.values(userTeam.roster).filter((pos) => pos !== null).length ===
      5 ? (
        <button
          onClick={handleFinishSimulation}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Finish Simulation
        </button>
      ) : (
        <button
          onClick={handleSimDay}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sim Day
        </button>
      )}
    </div>
  );
};

export default DayCounter;
