import { createSlice } from "@reduxjs/toolkit";

import createTrip from "../utils/tripHelper";

const initialTripsState = [];

const tripsSlice = createSlice({
  name: "trips",
  initialState: initialTripsState,
  reducers: {
    addTrip: (state, action) => {
      const { team, city, day } = action.payload;
      let trip = createTrip(team, city, day, state);
      state.push(trip);
    },
    handleTrip: (state, action) => {
      return state.map((trip) =>
        trip.tripID === action.payload ? { ...trip, isFinished: true } : trip
      );
    },
    setTrips: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTrip, handleTrip, setTrips } = tripsSlice.actions;
export default tripsSlice.reducer;
