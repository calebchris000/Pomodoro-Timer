import { writable, type Writable } from "svelte/store";

type Theme = {
  primary: string;
  secondary: string;
  cto: string;
};

type Timer = {
  time: { minutes: number; seconds: number };
  break: { minutes: number; seconds: number };
  prepare: boolean;
  signal: string;
  percentage: number
};
interface Defaults {
  theme: Theme;
  timer: Timer;
  currentPage: string;
}

let defaults: Defaults = {
  theme: {
    primary: "#b5d8fa",
    secondary: "#7ab4ed",
    cto: "#2b7bcb",
  },
  timer: {
    signal: "",
    time: { minutes: 0, seconds: 5 },
    break: {minutes: 5, seconds: 0},
    prepare: false,
    percentage: 100
  },

  currentPage: "home",
};

export const store: Writable<Defaults> = writable(defaults);


store.subscribe(defaults => console.log(defaults.timer.signal))