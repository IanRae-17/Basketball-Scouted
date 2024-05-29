import { createSlice } from "@reduxjs/toolkit";

const activeClusterSlice = createSlice({
  name: "activeCluster",
  initialState: null,
  reducers: {
    setCluster(state, action) {
      return action.payload;
    },
  },
});

export const { setCluster } = activeClusterSlice.actions;
export default activeClusterSlice.reducer;
