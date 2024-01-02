import { store } from "../store";

export const Splash = () => {
  let splashDelay: number = 1000;
  store.subscribe((defaults) => (splashDelay = defaults.splashDelay));
  setTimeout(() => {
    store.update((defaults) => {
      defaults.currentPage = "home";
      if (
        defaults.timer.signal === "ongoing" ||
        defaults.timer.signal === "break"
      ) {
        defaults.timer.signal = "pause";
      } else {
        defaults.timer.signal = "reset";
      }

      return defaults;
    });
  }, splashDelay * 1000);
};
