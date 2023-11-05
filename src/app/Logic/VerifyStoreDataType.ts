type Theme = {
  primary: string;
  secondary: string;
  cto: string;
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
  settings: { selectedMinute: string; selectedBreakMinute: string; Times: any[]; BreakTimes: any[] };
  currentPage: string;
  splashDelay: number;
}

export function isDefaults(obj: any): obj is Defaults {
  return (
    obj &&
    typeof obj.theme === "object" &&
    typeof obj.theme.primary === "string" &&
    typeof obj.theme.secondary === "string" &&
    typeof obj.theme.cto === "string" &&
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
    typeof obj.timer.Times === "object" &&
    typeof obj.timer.BreakTimes === "object" &&
    typeof obj.timer.percentage === "number" &&
    typeof obj.settings === "object" &&
    typeof obj.settings.selectedMinute === "string" &&
    typeof obj.settings.selectedBreakMinute === "string" &&
    typeof obj.currentPage === "string" &&
    typeof obj.splashDelay === "number"
  );
}
