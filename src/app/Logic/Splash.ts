import { store } from "../store";

export const Splash = () => {
  let splashDelay: number = 1000;
  store.subscribe((defaults) => (splashDelay = defaults.splashDelay));
  setTimeout(() => {
    store.update((defaults) => {
      defaults.currentPage = "home";

      return defaults;
    });
  }, splashDelay * 1000);
};
