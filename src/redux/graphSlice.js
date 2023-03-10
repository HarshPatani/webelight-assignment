import { createSlice } from "@reduxjs/toolkit";

export const changeGraphSlice = createSlice({
  name: "graphType",
  initialState: "Commits",
  reducers: {
    changeGraph: (state, action) => (state = action.payload),
  },
});

// this is for dispatch
export const { changeGraph } = changeGraphSlice.actions;

// this is for configureStore
export default changeGraphSlice.reducer;