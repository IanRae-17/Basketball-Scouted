import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoom: 5,
  center: {
    location: { lat: 0, lng: 0 },
  },
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setZoom(state, action) {
      state.zoom = action.payload;
    },
    setCenter(state, action) {
      console.log(action.payload);
      state.center.location = action.payload;
    },
  },
});

export const { setZoom, setCenter } = mapSlice.actions;
export default mapSlice.reducer;
