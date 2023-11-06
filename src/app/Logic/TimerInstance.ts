import { Timer, type TimerInterface } from "./Timer";
import { store } from "../store";

export type timer = {
  minutes: number;
  seconds: number;
};

let TimerInterface: timer = { minutes: 0, seconds: 0 };

export const timerInstance = new Timer((callback: TimerInterface) => {
  store.update((defaults) => {
    defaults.timer.runningTimer = { minutes: callback.minutes, seconds: callback.seconds };
    return defaults;
  });
});