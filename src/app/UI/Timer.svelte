<script lang="ts">
  import type { TimerInterface } from "./../Logic/Timer.ts";
  import TimerBody from "./TimerBody.svelte";
  import { store } from "../store";
  import { Timer } from "../Logic/Timer";
  import { PercentageFromTime } from "../Logic/PercentageFromTime.js";

  let timerType: string = "Work Time";
  let timeFromStore = $store.timer.time;
  let breakTime = $store.timer.break;

  $: percentage = $store.timer.percentage;
  $: primary = $store.theme.primary;
  $: cto = $store.theme.cto;

  let timerInterface: TimerInterface = { minutes: 0, seconds: 0, fullSeconds: 0 };

  let timer = new Timer((c: any) => {
    timerInterface = c;
  });

  $: {
    switch ($store.timer.signal) {
      case "ongoing":
        timer.set(timeFromStore.minutes, timeFromStore.seconds);
        timer.start();
        break;
      case "pause":
        timer.pause();
        break;
      case "break":
        timer.set(breakTime.minutes, breakTime.seconds);
        timer.start();
        break;
      case "reset":
        timer.set(timeFromStore.minutes, timeFromStore.seconds);
    }
  }

  function startBreakTime() {
    timer.set(breakTime.minutes, breakTime.seconds);
    timer.start();
  }
  $: {
    if (timerInterface.seconds === 0 && $store.timer.signal === "ongoing") {
      store.update((defaults) => {
        defaults.timer.signal = "break";
        return defaults;
      });
      startBreakTime();
    }
  }

  $: {
    if ($store.timer.signal === "ongoing") {
      let timeToSeconds = Math.floor(timeFromStore.minutes * 60) + timeFromStore.seconds;
      percentage = PercentageFromTime(timerInterface.fullSeconds, timeToSeconds);
    } else if ($store.timer.signal === "break") {
      let timeToSeconds = Math.floor(breakTime.minutes * 60) + breakTime.seconds;
      percentage = PercentageFromTime(timerInterface.fullSeconds, timeToSeconds);
    }
  }

  timer.set(timeFromStore.minutes, timeFromStore.seconds);
</script>

<TimerBody>
  <h3 class="text-center text-2xl font-semibold">{timerType}</h3>

  <div
    style="background: radial-gradient(closest-side, {primary} 82%, transparent 80% 100%), conic-gradient({cto} {percentage}%, white 0);"
    class="progress-bar w-[12rem] h-[12rem] rounded-full flex flex-col items-center justify-center"
  >
    <p class="text-sm font-semibold">Time Left:</p>
    <h3 class="text-5xl font-semibold mb-5">
      {String(timerInterface.minutes).length === 1 ? 0 : ""}{timerInterface.minutes}:{String(timerInterface.seconds).length === 1
        ? 0
        : ""}{timerInterface.seconds}
    </h3>
  </div>
</TimerBody>
