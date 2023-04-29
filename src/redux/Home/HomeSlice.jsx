import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMinutes: 25,
  currentSeconds: 0,
};

const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    addTimer: (state, { payload }) => {
      return {
        ...state,
        currentMinutes: state.currentMinutes + payload,
      };
    },
    removeTimer: (state, { payload }) => {
      return {
        ...state,
        currentMinutes: Math.abs(state.currentMinutes - payload),
      };
    },
    setTimer: (state, { payload }) => ({
      ...state,
      currentMinutes: payload,
    }),
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

export const { setTimer, runningTimer, goOnBreak, addTimer, removeTimer } = HomeSlice.actions;
export default HomeSlice.reducer;
