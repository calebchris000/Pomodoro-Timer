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
  $: primary = $store.theme.primary;
  $: cto = $store.theme.cto;
  $: runningTimer = $store.timer.runningTimer;
  $: signal = $store.timer.signal;

  $: {
    signal, runningTimer, PercentageProgress();
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
