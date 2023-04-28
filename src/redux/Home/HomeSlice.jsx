import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMinutes: 0,
  currentSeconds: 0,
  isRunning: false,
  rounds: 0,
  goals: 0,
  roundsOf: 0,
  goalsOf: 0,
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

export const { setTimer, startPause, runningTimer } = HomeSlice.actions;
export default HomeSlice.reducer;
