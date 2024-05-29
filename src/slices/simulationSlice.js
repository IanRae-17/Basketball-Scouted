import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  day: 1,
  finished: false,
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    incrementDay: (state) => {
      state.day += 1;
    },
    setFinished: (state, action) => {
      state.finished = action.payload;
    },
  },
});

export const { incrementDay, setFinished } = simulationSlice.actions;
export default simulationSlice.reducer;
