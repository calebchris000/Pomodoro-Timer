<script lang="ts">
  import TimerBody from "./TimerBody.svelte";
  import { store } from "../store";
  import { PercentageFromTime } from "../Logic/PercentageFromTime.js";
  import { PercentageProgress } from "../Logic/PercentageProgress";

  let timeFromStore = $store.timer.time;
  $: runningTimer = $store.timer.runningTimer;
  let breakTime = $store.timer.break;
  $: signal = $store.timer.signal;

  $: {
    switch (signal) {
      case "ongoing":
        const runningSeconds = runningTimer.minutes * 60 + runningTimer.seconds;
        const timeSeconds = timeFromStore.minutes * 60 + timeFromStore.seconds;
        const percentage = (runningSeconds / timeSeconds) * 100;
        store.update((s) => {
          s.timer.percentage = percentage;
          return s;
        });
        break;

      case "break":
        const running_seconds =
          runningTimer.minutes * 60 + runningTimer.seconds;
        const breakSeconds = breakTime.minutes * 60 + breakTime.seconds;
        const break_percent = (running_seconds / breakSeconds) * 100;
        store.update((s) => {
          s.timer.percentage = break_percent;
          return s;
        });
        break;
    }
  }

  function sendPauseSignal() {
    if ($store.timer.signal === "reset") {
      return;
    }
    $store.timer.signal = "pause";
  }
  let timerType: string = "Work Time";

  $: percentage = $store.timer.percentage;
  $: primary = $store.theme.active.primary;
  $: secondary = $store.theme.active.secondary;
  $: cto =
    $store.theme.selected === "light" ? $store.theme.active.cto : "white";

  $: {
    // signal, runningTimer, PercentageProgress();
  }
  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
  $: btnColor = $store.theme.selected === "dark" ? secondary : primary;
</script>

<TimerBody>
  <h3 style="color: {textColor}" class="text-center text-2xl font-semibold">
    {timerType}
  </h3>

  <button
    on:click={sendPauseSignal}
    style="background: radial-gradient(closest-side, {btnColor} 82%, transparent 80% 100%), conic-gradient({cto} {percentage}%, #070d14 0);"
    class="progress-bar w-[12rem] h-[12rem] rounded-full flex flex-col items-center justify-center"
  >
    <p style="color: {textColor}" class="text-sm font-semibold">Time Left:</p>
    <h3 style="color: {textColor}" class="text-5xl font-semibold mb-5">
      {String(runningTimer.minutes).length === 1
        ? 0
        : ""}{runningTimer.minutes}:{String(runningTimer.seconds).length === 1
        ? 0
        : ""}{runningTimer.seconds}
    </h3>
  </button>
</TimerBody>
