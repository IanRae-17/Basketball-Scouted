import { createSlice } from "@reduxjs/toolkit";

const initialClusterState = {};

const clusterSlice = createSlice({
  name: "cluster",
  initialState: initialClusterState,
  reducers: {
    setCluster: (state, action) => {
      let newCluster = action.payload;

      if (state.id && state.id === newCluster.id) {
        // Same cluster was cliked on. Make in inactive
        return {};
      } else return newCluster;
    },

    // Add other actions related to clusters
  },
});

export const { setCluster } = clusterSlice.actions;
export default clusterSlice.reducer;
