import { onDestroy } from "svelte";
import { store } from "../store";
import { PercentageFromTime } from "./PercentageFromTime";

type TimerType = {
  minutes: number;
  seconds: number;
};

export const PercentageProgress = () => {
  let timeFromStore: TimerType = { minutes: 0, seconds: 0 };
  let breakTime: TimerType = { minutes: 0, seconds: 0 };
  let runningTimer: TimerType = { minutes: 0, seconds: 0 };
  let percentage: number = 0;
  let signal: string = "reset";
  const unsubscribe = store.subscribe((defaults) => {
    timeFromStore = defaults.timer.time;
    breakTime = defaults.timer.break;
    runningTimer = defaults.timer.runningTimer;
    percentage = defaults.timer.percentage;
    signal = defaults.timer.signal;
  });

  let timeToSeconds = timeFromStore.minutes * 60 + timeFromStore.seconds;
  let runningTimerToSeconds =
    Math.floor(runningTimer.minutes * 60) + runningTimer.seconds;
  if (signal === "ongoing") {
    percentage = PercentageFromTime(runningTimerToSeconds, timeToSeconds);
    store.update((defaults) => {
      defaults.timer.percentage = percentage;
      return defaults;
    });
  } else if (signal === "break") {
    let timeToSeconds = Math.floor(breakTime.minutes * 60) + breakTime.seconds;
    percentage = PercentageFromTime(runningTimerToSeconds, timeToSeconds);
    store.update((defaults) => {
      defaults.timer.percentage = percentage;
      return defaults;
    });
  }

  onDestroy(unsubscribe);
};
