import { writable, type Writable } from "svelte/store";
import { isDefaults, type Defaults } from "./Logic/VerifyStoreDataType";
import defaultSound from "$lib/sounds/default.mp3";
import EveningStars from "$lib/sounds/evening_stars.mp3";
import WinterStars from "$lib/sounds/winter_star.mp3";

let defaults: Defaults = {
  theme: {
    light: {
      primary: "#b5d8fa",
      secondary: "#7ab4ed",
      cto: "#2b7bcb",
    },
    dark: {
      primary: "#070d14",
      secondary: "#0d1926",
      cto: "#ffffff",
    },
    active: {
      primary: "#b5d8fa",
      secondary: "#7ab4ed",
      cto: "#2b7bcb",
    },

    selected: "dark",
    collection: [
      {
        "Midnight Blue": {
          primary: "829cbc",
          secondary: "#376996",
          cto: "#1d3461",
        },
      },
    ],
  },

  sound: {
    volume: 0.5,
    activeSound: defaultSound,
    quickVolume: true,
    status: "paused",
    time: 0,
    muted: false,
    collectionPath: [
      { title: "Default", path: defaultSound },
      { title: "Evening Stars", path: EveningStars },
      { title: "Winter Stars", path: WinterStars },
    ],
  },
  timer: {
    signal: "reset",
    time: { minutes: 25, seconds: 0 },
    runningTimer: { minutes: 0, seconds: 0 },
    break: { minutes: 5, seconds: 0 },
    isBreak: false,
    prepare: false,
    percentage: 100,
  },
  settings: {
    selectedTimeOption: "25 minutes",
    selectedBreakOption: "5 minutes",
    Times: [
      { minutes: 10, seconds: 0, text: "10 minutes" },
      { minutes: 15, seconds: 0, text: "15 minutes" },
      { minutes: 25, seconds: 0, text: "25 minutes" },
      { minutes: 40, seconds: 0, text: "40 minutes" },
    ],
    BreakTimes: [
      { minutes: 10, seconds: 0, text: "5 minutes" },
      { minutes: 15, seconds: 0, text: "10 minutes" },
      { minutes: 25, seconds: 0, text: "15 minutes" },
      { minutes: 40, seconds: 0, text: "20 minutes" },
    ],
  },

  currentPage: "splash",
  splashDelay: 2,
  showOption: false,
};

export const store: Writable<Defaults> = writable(defaults);
let data = localStorage.getItem("data");
if (data && data.length > 0) {
  const parsed = JSON.parse(data);
  if (isDefaults(parsed)) {
    store.set({ ...parsed, currentPage: "splash" });
  } else {
    localStorage.clear();
  }
}
store.subscribe((defaults) => {
  localStorage.setItem("data", JSON.stringify(defaults));
});

// store.subscribe((defaults) => {
//   console.log(defaults.sound.volume);
// });
