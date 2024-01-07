import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "../slices/citiesSlice";
import playersReducer from "../slices/playersSlice";
import contractsReducer from "../slices/contractsSlice";
import tripsReducer from "../slices/tripsSlice";
import mapReducer from "../slices/mapSlice";
import activeClusterReducer from "../slices/activeClusterSlice";
import simulationReducer from "../slices/simulationSlice";

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    players: playersReducer,
    contracts: contractsReducer,
    trips: tripsReducer,
    map: mapReducer,
    activeCluster: activeClusterReducer,
    simulation: simulationReducer,
  },
});

export default store;
