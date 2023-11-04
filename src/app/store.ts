import { onMount } from "svelte";
import { writable, type Writable } from "svelte/store";

type Theme = {
  primary: string;
  secondary: string;
  cto: string;
};

type Timer = {
  time: { minutes: number; seconds: number };
  runningTimer: {minutes: number, seconds: number}
  break: { minutes: number; seconds: number };
  prepare: boolean;
  signal: string;
  percentage: number;
};
interface Defaults {
  theme: Theme;
  timer: Timer;
  settings: { selectedMinute: string, selectedBreakMinute: string };
  currentPage: string;
}

let defaults: Defaults = {
  theme: {
    primary: "#b5d8fa",
    secondary: "#7ab4ed",
    cto: "#2b7bcb",
  },
  timer: {
    signal: "reset",
    time: { minutes: 25, seconds: 0 },
    runningTimer: {minutes: 0, seconds: 0},
    break: { minutes: 5, seconds: 0 },
    prepare: false,
    percentage: 100,
  },
  settings: {
    selectedMinute: '25 minutes',
    selectedBreakMinute: '5 minutes'
  },

  currentPage: "splash",
};

export const store: Writable<Defaults> = writable(defaults);


function isDefaults(obj: any): obj is Defaults {
  return obj &&
    typeof obj.theme === 'object' &&
    typeof obj.theme.primary === 'string' &&
    typeof obj.theme.secondary === 'string' &&
    typeof obj.theme.cto === 'string' &&
    typeof obj.timer === 'object' &&
    typeof obj.timer.time === 'object' &&
    typeof obj.timer.time.minutes === 'number' &&
    typeof obj.timer.time.seconds === 'number' &&
    typeof obj.timer.runningTimer === 'object' &&
    typeof obj.timer.runningTimer.minutes === 'number' &&
    typeof obj.timer.runningTimer.seconds === 'number' &&
    typeof obj.timer.break === 'object' &&
    typeof obj.timer.break.minutes === 'number' &&
    typeof obj.timer.break.seconds === 'number' &&
    typeof obj.timer.prepare === 'boolean' &&
    typeof obj.timer.signal === 'string' &&
    typeof obj.timer.percentage === 'number' &&
    typeof obj.settings === 'object' &&
    typeof obj.settings.selectedMinute === 'string' &&
    typeof obj.settings.selectedBreakMinute === 'string' &&
    typeof obj.currentPage === 'string';
}

let data = localStorage.getItem("data");
if (data && data.length > 0) {
  let parsed = JSON.parse(data);
  if (isDefaults(parsed)) {
    store.set({...parsed, currentPage: 'splash'});
  }
  else {
    localStorage.clear()
  }
}
store.subscribe((defaults) => {
  localStorage.setItem("data", JSON.stringify(defaults));
});
