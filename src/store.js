// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./slices/playersSlice";
import mapReducer from "./slices/mapSlice";
import activeClusterReducer from "./slices/activeClusterSlice";
import contractsReducer from "./slices/contractsSlice";
import citiesReducer from "./slices/citiesSlice";
import tripsReducer from "./slices/tripsSlice";
import simulationReducer from "./slices/simulationSlice";
// import teamReducer from "./slices/tea mSlice";

const store = configureStore({
  reducer: {
    players: playersReducer,
    map: mapReducer,
    activeCluster: activeClusterReducer,
    contracts: contractsReducer,
    cities: citiesReducer,
    trips: tripsReducer,
    simulation: simulationReducer,
    // team: teamReducer,
  },
});

export default store;
