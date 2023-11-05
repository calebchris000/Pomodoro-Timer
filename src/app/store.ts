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
    selectedMinute: "25 minutes",
    selectedBreakMinute: "5 minutes",
    Times: [
      { value: 10, text: "10 minutes", id: 1 },
      { value: 15, text: "15 minutes", id: 2 },
      { value: 25, text: "25 minutes", id: 3 },
      { value: 40, text: "40 minutes", id: 4 },
    ],
    BreakTimes: [
      { value: 5, text: "5 minutes", id: 1 },
      { value: 10, text: "10 minutes", id: 2 },
      { value: 15, text: "15 minutes", id: 3 },
      { value: 20, text: "20 minutes", id: 4 },
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
