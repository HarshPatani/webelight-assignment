import { createSlice } from "@reduxjs/toolkit";

export const repoDataSlice = createSlice({
  name: "repoData",
  initialState: [],
  reducers: {
    updateRepoData: (state, action) => {
      state = [...state, ...action.payload];
      return state;
    },
  },
});

//dispatch
export const { updateRepoData } = repoDataSlice.actions;

//configureStore
export default repoDataSlice.reducer;
