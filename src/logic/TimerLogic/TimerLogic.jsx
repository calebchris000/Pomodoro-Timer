class CountDownTimer {
  constructor(minutes, second, callback) {
    this.minutes = minutes || 0;
    this.second = second || 0;
    this.intervalId = null;
    this.callback = callback;
    this.totalSeconds = this.minutes * 60 + this.second;
  }

  start() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.totalSeconds = this.minutes * 60 + this.second;
    }

    this.intervalId = setInterval(() => {
      this.getMinutes = Math.floor(this.totalSeconds / 60);
      this.getSeconds = this.totalSeconds % 60;
      this.totalSeconds -= 1;

      if (this.totalSeconds < 0) {
        clearInterval(this.intervalId);
        console.warn("timer expired");
      }
      this.callback(this.getMinutes, this.getSeconds);
    }, 1000);
  }

  pause() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.totalSeconds = this.minutes * 60 + this.second;
  }
}

export default CountDownTimer;
