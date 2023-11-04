<script lang="ts">
  import TimerBody from "./TimerBody.svelte";
  import { store } from "../store";
  import { PercentageFromTime } from "../Logic/PercentageFromTime.js";

  let timeFromStore = $store.timer.time
  let breakTime = $store.timer.break
  function sendPauseSignal() {
    if ($store.timer.signal === "reset") {
      return;
    }
    store.update((defaults) => {
      defaults.timer.signal = "pause";
      return defaults;
    });
  }
  let timerType: string = "Work Time";

  $: percentage = $store.timer.percentage;
  $: primary = $store.theme.primary;
  $: cto = $store.theme.cto;
  $: runningTimer = $store.timer.runningTimer;
  // $: console.log(runningTimer)

  $: {
    let timeToSeconds = Math.floor(timeFromStore.minutes * 60) + timeFromStore.seconds;
    let runningTimerToSeconds = Math.floor(runningTimer.minutes * 60) + runningTimer.seconds
    if ($store.timer.signal === "ongoing") {
      percentage = PercentageFromTime(runningTimerToSeconds, timeToSeconds);
    } else if ($store.timer.signal === "break") {
      let timeToSeconds = Math.floor(breakTime.minutes * 60) + breakTime.seconds;
      percentage = PercentageFromTime(runningTimerToSeconds, timeToSeconds);
    }
  }
</script>

<TimerBody>
  <h3 class="text-center text-2xl font-semibold">{timerType}</h3>

  <button
    on:click={sendPauseSignal}
    style="background: radial-gradient(closest-side, {primary} 82%, transparent 80% 100%), conic-gradient({cto} {percentage}%, white 0);"
    class="progress-bar w-[12rem] h-[12rem] rounded-full flex flex-col items-center justify-center"
  >
    <p class="text-sm font-semibold">Time Left:</p>
    <h3 class="text-5xl font-semibold mb-5">
      {String(runningTimer.minutes).length === 1 ? 0 : ""}{runningTimer.minutes}:{String(runningTimer.seconds).length === 1 ? 0 : ""}{runningTimer.seconds}
    </h3>
  </button>
</TimerBody>
