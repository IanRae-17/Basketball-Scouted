import { createSlice } from "@reduxjs/toolkit";

const initialSimulationSlice = { day: 0 };

const simulationSlice = createSlice({
  name: "simulation",
  initialState: initialSimulationSlice,
  reducers: {
    stepDay: (state, action) => {
      state.day += 1;
    },
  },
});

export const { stepDay } = simulationSlice.actions;
export default simulationSlice.reducer;
