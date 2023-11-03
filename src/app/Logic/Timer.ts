export interface TimerInterface {
  minutes: number;
  seconds: number;
}

export class Timer {
  seconds: number;
  minute: number;
  callback: any;
  SecondsInMinute: number;
  interval: any;
  constructor(callback: any) {
    this.minute = 0;
    this.seconds = 0;
    this.SecondsInMinute = 60;
    this.interval = null;
    this.callback = callback;
  }

  set(minute: number, seconds: number) {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    let getSecondsInMinute = minute * 60;
    this.seconds = getSecondsInMinute + seconds;
    let TimerInterface: TimerInterface = { minutes: Math.floor(this.seconds / 60) % 60, seconds: this.seconds % 60 };

    this.callback(TimerInterface);
  }

  start() {
    if (this.interval) {
      console.warn("A timer has already begun");
      return;
    }

    this.interval = setInterval(() => {
      this.seconds -= 1;
      let TimerInterface: TimerInterface = { minutes: Math.floor(this.seconds / 60) % 60, seconds: this.seconds % 60 };
      this.callback(TimerInterface);
    }, 1000);
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    let TimerInterface: TimerInterface = { minutes: Math.floor(this.seconds / 60) % 60, seconds: this.seconds % 60 };
    this.callback(TimerInterface);
  }

  reset() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.seconds = 0;
    this.minute = 0;

    let TimerInterface: TimerInterface = { minutes: Math.floor(this.seconds / 60) % 60, seconds: this.seconds % 60 };
    this.callback(TimerInterface);
  }

  updateTimer(minute?: number | any, seconds?: number | any) {
    this.seconds = minute * 60 + seconds;
    let TimerInterface: TimerInterface = { minutes: Math.floor(this.seconds / 60) % 60, seconds: this.seconds % 60 };

    this.callback(TimerInterface);
  }
}
