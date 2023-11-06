import { store } from "../store";

type TimerType = {
  minutes: number;
  seconds: number;
};
export const GotoBreak = () => {
  let runningTimer: TimerType = { minutes: 0, seconds: 0 };
  let signal: string = "reset";
  store.subscribe((defaults) => {
    runningTimer = defaults.timer.runningTimer;
    signal = defaults.timer.signal;
  });
  if (runningTimer.minutes === 0 && runningTimer.seconds === 0 && (signal === "ongoing" || signal === "resume")) {
    store.update((defaults) => {
      defaults.timer.signal = "break";
      return defaults;
    });
  }
};
