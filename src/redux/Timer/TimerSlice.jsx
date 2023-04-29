import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rounds: 0,
  goals: 0,
  shortBreak: 0,
  longBreak: 0,
  onBreak: false,
};

const TimerSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    Rounds: (state) => {
      return {
        ...state,
        rounds: state.rounds + 1,
      };
    },
    ResetRound: (state) => {
      return {
        ...state,
        rounds: 0,
      };
    },
    Goals: (state) => {
      return {
        ...state,
        goals: state.goals + 1,
      };
    },
    ResetGoals: (state) => {
      return {
        ...state,
        goals: 0,
      };
    },
    startShortBreak: (state) => {
      return {
        ...state,
        shortBreak: 30,
      };
    },
    goOnBreak: (state, {payload}) => {
      return {
        ...state,
        onBreak: payload,
      };
    },
  },
});

export const { Rounds, ResetRound, Goals, ResetGoals, startShortBreak, goOnBreak } = TimerSlice.actions;
export default TimerSlice.reducer;
