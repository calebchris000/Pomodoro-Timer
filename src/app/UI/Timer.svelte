<script lang="ts">
  import TimerBody from "./TimerBody.svelte";
  import { store } from "../store";
  import { PercentageFromTime } from "../Logic/PercentageFromTime.js";
  import { PercentageProgress } from "../Logic/PercentageProgress";

  let timeFromStore = $store.timer.time;
  let breakTime = $store.timer.break;

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
  $: cto = $store.theme.active.cto;
  $: runningTimer = $store.timer.runningTimer;
  $: signal = $store.timer.signal;

  $: {
    signal, runningTimer, PercentageProgress();
  }
  $: textColor = $store.theme.selected === "dark" ? "white" : "black";
  $: btnColor = $store.theme.selected === "dark" ? secondary : primary
</script>

<TimerBody>
  <h3 style="color: {textColor}" class="text-center text-2xl font-semibold">{timerType}</h3>

  <button
    on:click={sendPauseSignal}
    style="background: radial-gradient(closest-side, {btnColor} 82%, transparent 80% 100%), conic-gradient({cto} {percentage}%, white 0);"
    class="progress-bar w-[12rem] h-[12rem] rounded-full flex flex-col items-center justify-center"
  >
    <p style="color: {textColor}" class="text-sm font-semibold">Time Left:</p>
    <h3 style="color: {textColor}" class="text-5xl font-semibold mb-5">
      {String(runningTimer.minutes).length === 1 ? 0 : ""}{runningTimer.minutes}:{String(runningTimer.seconds).length === 1 ? 0 : ""}{runningTimer.seconds}
    </h3>
  </button>
</TimerBody>
