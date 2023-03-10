import { configureStore } from "@reduxjs/toolkit";
import changeGraphReducer from "./redux/graphSlice";
import repoSliceReducer from "./redux/repoSlice";

export default configureStore({
  reducer: {
    changeGraph: changeGraphReducer,
    repoSlice: repoSliceReducer,
  },
});
