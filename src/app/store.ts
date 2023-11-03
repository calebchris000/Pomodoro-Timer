import { writable, type Writable } from "svelte/store";

type Theme = {
  primary: string;
  secondary: string;
  cto: string;
};

type Timer = {
  hour: number;
  minute: number;
  seconds: number;
  signal: string | null;
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
    hour: 0,
    minute: 0,
    seconds: 0,
    signal: null
  },

  currentPage: "home",
};

export const store: Writable<Defaults> = writable(defaults);
