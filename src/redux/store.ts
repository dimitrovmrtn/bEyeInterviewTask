import { configureStore } from "@reduxjs/toolkit";
import surveySlice from "./surveySlice.ts";
import questionSlice from "./questionSlice.ts";
import userSlice from "./userSlice.ts";
import assignmentSlice from "./assignmentSlice.ts";

const store = configureStore({
  reducer: {
    surveys: surveySlice,
    questions: questionSlice,
    users: userSlice,
    assignments: assignmentSlice,
  },
});

// TS was unhappy with the dispatch type, so this fixes it
export type AppDispatch = typeof store.dispatch;

export default store;
