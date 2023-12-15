type Mode = {
  primary: string;
  secondary: string;
  cto: string;
};

type Theme = {
  light: Mode;
  dark: Mode;
  active: Mode;
  collection: any[];
  selected: "light" | "dark" | "custom";
};

type CollectionPath = {
  title: string;
  path: string;
};

type Sound = {
  volume: number;
  quickVolume: boolean;
  status: "inactive" | "playing" | "paused";
  activeSound: string;
  muted: boolean;
  collectionPath: CollectionPath[];
};

type Timer = {
  time: { minutes: number; seconds: number };
  runningTimer: { minutes: number; seconds: number };
  break: { minutes: number; seconds: number };
  prepare: boolean;
  signal: string;
  percentage: number;
};

export type Times = {
  text: string;
  value: number;
  id: number;
};
export interface Defaults {
  theme: Theme;
  timer: Timer;
  sound: Sound;
  settings: {
    selectedTimeOption: string;
    selectedBreakOption: string;
    Times: any[];
    BreakTimes: any[];
  };
  currentPage: string;
  splashDelay: number;
  showOption: boolean;
}

export function isDefaults(obj: any): obj is Defaults {
  return (
    obj &&
    typeof obj.theme === "object" &&
    typeof obj.theme.light.primary === "string" &&
    typeof obj.theme.light.secondary === "string" &&
    typeof obj.theme.light.cto === "string" &&
    typeof obj.theme.dark.primary === "string" &&
    typeof obj.theme.dark.secondary === "string" &&
    typeof obj.theme.dark.cto === "string" &&
    typeof obj.theme.active.primary === "string" &&
    typeof obj.theme.active.secondary === "string" &&
    typeof obj.theme.active.cto === "string" &&
    typeof obj.theme.collection === "object" &&
    typeof obj.theme.selected === "string" &&
    typeof obj.sound.volume === "number" &&
    typeof obj.sound.quickVolume === "boolean" &&
    typeof obj.sound.muted === "boolean" &&
    typeof obj.sound.status === "string" &&
    typeof obj.sound.activeSound === "string" &&
    typeof obj.sound.collectionPath === "object" &&
    typeof obj.timer === "object" &&
    typeof obj.timer.time === "object" &&
    typeof obj.timer.time.minutes === "number" &&
    typeof obj.timer.time.seconds === "number" &&
    typeof obj.timer.runningTimer === "object" &&
    typeof obj.timer.runningTimer.minutes === "number" &&
    typeof obj.timer.runningTimer.seconds === "number" &&
    typeof obj.timer.break === "object" &&
    typeof obj.timer.break.minutes === "number" &&
    typeof obj.timer.break.seconds === "number" &&
    typeof obj.timer.prepare === "boolean" &&
    typeof obj.timer.signal === "string" &&
    typeof obj.settings.Times === "object" &&
    typeof obj.settings.BreakTimes === "object" &&
    typeof obj.timer.percentage === "number" &&
    typeof obj.settings === "object" &&
    typeof obj.settings.selectedTimeOption === "string" &&
    typeof obj.settings.selectedBreakOption === "string" &&
    typeof obj.currentPage === "string" &&
    typeof obj.splashDelay === "number" &&
    typeof obj.showOption === "boolean"
  );
}
