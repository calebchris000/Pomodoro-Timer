import { onMount } from "svelte";
import { writable, type Writable } from "svelte/store";
import { isDefaults, type Defaults } from "./Logic/VerifyStoreDataType";

let defaults: Defaults = {
  theme: {
    primary: "#b5d8fa",
    secondary: "#7ab4ed",
    cto: "#2b7bcb",
  },
  timer: {
    signal: "reset",
    time: { minutes: 25, seconds: 0 },
    runningTimer: { minutes: 0, seconds: 0 },
    break: { minutes: 5, seconds: 0 },
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
      { minutes: 10, seconds: 0, text: "5 minutes",},
      { minutes: 15, seconds: 0, text: "10 minutes", },
      { minutes: 25, seconds: 0, text: "15 minutes", },
      { minutes: 40, seconds: 0, text: "20 minutes", },
    ],
  },

  currentPage: "splash",
  splashDelay: 2,
};

export const store: Writable<Defaults> = writable(defaults);

let data = localStorage.getItem("data");
if (data && data.length > 0) {
  let parsed = JSON.parse(data);
  if (isDefaults(parsed)) {
    store.set({ ...parsed, currentPage: "splash" });
  } else {
    localStorage.clear();
  }
}
store.subscribe((defaults) => {
  localStorage.setItem("data", JSON.stringify(defaults));
});
