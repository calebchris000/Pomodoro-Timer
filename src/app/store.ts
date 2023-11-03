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
};
interface Defaults {
  theme: Theme;
  timer: Timer;
}

let defaults: Defaults = {
  theme: {
    primary: "#ffdbb9",
    secondary: "#eab07a",
    cto: "#e37107",
  },
  timer: {
    hour: 0,
    minute: 0,
    seconds: 0,
  },
};

export const store: Writable<Defaults> = writable(defaults);
