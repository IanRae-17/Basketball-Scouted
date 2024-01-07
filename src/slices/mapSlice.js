import { createSlice } from "@reduxjs/toolkit";

const initialMapState = {
  center: {
    locationID: "638ff561-e201-4435-bcf8-0c8be908891c",
    label: "Miami, Heat",
    type: "team",
    typeID: "b23a136c-8369-430f-8fa2-d3c83a8ba76d",
    location: {
      lat: 25.7617,
      lng: -80.1918,
    },
  },
  zoom: 8,
};

const mapSlice = createSlice({
  name: "map",
  initialState: initialMapState,
  reducers: {
    setCenter: (state, action) => {
      state.center = action.payload;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
    // Future actions
  },
});

export const { setCenter, setZoom } = mapSlice.actions;
export default mapSlice.reducer;
