import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMinutes: 25,
  currentSeconds: 0,
  isRunning: false,
};

const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    setTimer: (state, { payload }) => ({
      ...state,
      currentMinutes: payload,
    }),
    startPause: (state, { payload }) => {
      return {
        ...state,
        isRunning: payload ? payload : !state.isRunning,
      };
    },
    reset: (state, { payload }) => ({
      ...state,
      currentMinutes: payload,
    }),
    runningTimer: (state, { payload }) => ({
      ...state,
      currentMinutes: payload.min,
      currentSeconds: payload.sec,
    }),
  },
});

export const { setTimer, startPause, runningTimer, goOnBreak } = HomeSlice.actions;
export default HomeSlice.reducer;
