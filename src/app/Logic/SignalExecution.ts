import { Timer, type TimerInterface } from "./Timer";
import { store } from "../store";
import { onDestroy } from "svelte";
import { timerInstance as timer } from "./TimerInstance";

type TimerType = {
  minutes: number;
  seconds: number;
};
export const SignalExecution = () => {
  let timeFromStore: TimerType = { minutes: 0, seconds: 0 };
  let breakTime: TimerType = { minutes: 0, seconds: 0 };

  let signal: string = "";
  let isBreak: boolean = false;
  const unsubscribe = store.subscribe((defaults) => {
    signal = defaults.timer.signal;
    timeFromStore = defaults.timer.time;
    breakTime = defaults.timer.break;
    isBreak = defaults.timer.isBreak;
  });

  switch (signal) {
    case "ongoing":
      if (isBreak) {
        store.update((defaults) => {
          defaults.timer.isBreak = false;
          return defaults
        });
      }
      timer.set(timeFromStore.minutes, timeFromStore.seconds);
      timer.start();
      break;
    case "pause":
      timer.pause();
      break;
    case "break":
      timer.set(breakTime.minutes, breakTime.seconds);
      timer.start();
      break;
    case "resume":
      timer.start();
      break;
    case "reset":
      timer.set(timeFromStore.minutes, timeFromStore.seconds);
      break;
  }
  onDestroy(unsubscribe);
};
